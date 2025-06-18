// src/hooks/useEmployeePools.ts
import { useState, useEffect } from 'react';
import { Pool, DragDropData } from '@/types/pool.types';
import { poolService } from '@/services/pool.service';

export function useEmployeePools() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPools();
  }, []);

  const loadPools = async () => {
    try {
      setIsLoading(true);
      const data = await poolService.getAllPools();
      setPools(data);
      setError(null);
    } catch (err) {
      setError('Failed to load pools. Please try again.');
      console.error('Error loading pools:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const moveEmployee = async (data: DragDropData) => {
    const originalPools = [...pools];
    const newPools = [...pools];
    const fromPool = newPools.find(p => p.id === data.fromPoolId);
    const toPool = newPools.find(p => p.id === data.toPoolId);

    if (!fromPool || !toPool) return;

    const employee = fromPool.employees[data.employeeIndex];
    if (!employee) return;

    fromPool.employees.splice(data.employeeIndex, 1);

    if (data.fromPoolId === data.toPoolId) {
      const adjustedIndex = data.targetIndex > data.employeeIndex ? 
        data.targetIndex - 1 : data.targetIndex;
      toPool.employees.splice(adjustedIndex, 0, employee);
    } else {
      toPool.employees.splice(data.targetIndex, 0, employee);
    }

    setPools(newPools);

    try {
      const response = await poolService.moveEmployee(data);
      if (!response.success) {
        throw new Error(response.message);
      }
    } catch (err) {
      setPools(originalPools);
      setError('Failed to move employee. Please try again.');
      console.error('Error moving employee:', err);
    }
  };

  const clearError = () => setError(null);

  const stats = {
    totalEmployees: pools.reduce((sum, pool) => sum + pool.employees.length, 0),
    activeEmployees: pools.reduce((sum, pool) => 
      sum + pool.employees.filter(e => e.status === 'active').length, 0
    )
  };

  return {
    pools,
    isLoading,
    error,
    stats,
    moveEmployee,
    clearError,
    reload: loadPools
  };
}