import { api } from './api';
import { Car, CarsResponse } from '@/types/car';

interface CarsParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  limit?: string;
  page?: string;
}

export async function getCars(params: CarsParams = {}): Promise<CarsResponse> {
  const { data } = await api.get<CarsResponse>('/cars', {
    params,
  });

  return data;
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}

export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<string[]>('/brands');
  return data;
}
