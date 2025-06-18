// src/services/employee.service.ts
import { fetchApi } from './api';
import { Employee } from '@/types/employee.types';

export interface UpdateEmployeeStatusRequest {
  status: 'active' | 'absent' | 'busy';
}

export const employeeService = {
  async getAllEmployees(): Promise<Employee[]> {
    return fetchApi<Employee[]>('/employees');
  },

  async getEmployeeById(id: number): Promise<Employee> {
    return fetchApi<Employee>(`/employees/${id}`);
  },

  async updateEmployeeStatus(id: number, status: string): Promise<any> {
    return fetchApi(`/employees/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};