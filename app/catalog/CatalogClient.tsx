'use client';

import { useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCars, getBrands } from '@/lib/api/clientApi';
import { defaultFilters, useCarsStore } from '@/lib/store/carsStore';

import Loader from '@/components/Loader/Loader';
import CarFilters from '@/components/Filters/Filters';
import CarList from '@/components/CarList/CarList';
import css from './CatalogClient.module.css';

function CatalogClient() {
  const { filters } = useCarsStore();

  const [submittedFilters, setSubmittedFilters] = useState(defaultFilters);

  const { data: brands = [] } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
    refetchOnMount: false,
  });

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['cars', submittedFilters],
      queryFn: ({ pageParam = 1 }) =>
        getCars({
          ...submittedFilters,
          page: String(pageParam),
          limit: '12',
        }),
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        const currentPage = Number(lastPage.page);
        const totalPages = Number(lastPage.totalPages);

        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
      refetchOnMount: false,
    });

  const cars = data?.pages.flatMap(page => page.cars) ?? [];

  const handleSearch = () => {
    setSubmittedFilters(filters);
  };

  return (
    <main>
      <div className="container">
        <CarFilters brands={brands} onSearch={handleSearch} />

        {(isLoading || isFetching) && <Loader />}

        {cars.length > 0 && <CarList cars={cars} />}

        {isError && (
          <p className={css.emptyStateMessage}>Something went wrong. Please try again.</p>
        )}

        {!isLoading && !isError && cars.length === 0 && (
          <p className={css.emptyStateMessage}>No cars found for your search criteria.</p>
        )}

        {!isError && hasNextPage && (
          <div className={css.paginationWrapper}>
            <button
              className={css.paginationButton}
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default CatalogClient;
