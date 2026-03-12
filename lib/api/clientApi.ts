import { api } from "./api";
import { Car, CarsResponse } from "@/types/car";

export interface CarsParams {
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
    limit?: string;
    page?: string;
}

export async function getCars(
    params: CarsParams = {}
): Promise<CarsResponse> {
    const { data } = await api.get<CarsResponse>("/cars", {
        params,
    });

    return data;
}

export async function getCarById(id: string): Promise<Car> {
    const { data } = await api.get<Car>(`/cars/${id}`);
    return data;
}