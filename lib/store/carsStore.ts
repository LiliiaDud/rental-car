import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Filters {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

interface CarsStore {
  filters: Filters;
  favorites: string[];

  setFilter: (name: keyof Filters, value: string) => void;
  resetFilters: () => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const defaultFilters: Filters = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
};

export const useCarsStore = create<CarsStore>()(
  persist(
    (set, get) => ({
      filters: defaultFilters,
      favorites: [],

      setFilter: (name, value) =>
        set(state => ({
          filters: {
            ...state.filters,
            [name]: value,
          },
        })),

      resetFilters: () => set({ filters: defaultFilters }),

      toggleFavorite: id =>
        set(state => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter(item => item !== id)
            : [...state.favorites, id],
        })),

      isFavorite: id => get().favorites.includes(id),
    }),
    {
      name: 'cars-store',
      partialize: state => ({
        filters: state.filters,
        favorites: state.favorites,
      }),
    }
  )
);
