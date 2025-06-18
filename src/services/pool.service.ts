// src/services/pool.service.ts
import { fetchApi } from './api';
import { Pool } from '@/types/pool.types';

export interface MoveEmployeeRequest {
  fromPoolId: string;
  toPoolId: string;
  employeeIndex: number;
  targetIndex: number;
}

export interface MoveEmployeeResponse {
  success: boolean;
  message: string;
}

export const poolService = {
  async getAllPools(): Promise<Pool[]> {
    return fetchApi<Pool[]>('/pools');
  },

  async moveEmployee(data: MoveEmployeeRequest): Promise<MoveEmployeeResponse> {
    return fetchApi<MoveEmployeeResponse>('/assignments/move', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};