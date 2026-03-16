import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getBrands, getCars } from '@/lib/api/clientApi';
import { defaultFilters } from '@/lib/store/carsStore';
import CatalogClient from './CatalogClient';

export default async function CatalogPage() {
  const queryClient = new QueryClient();
  const initialPage = 1;
  const limit = 12;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['brands'],
      queryFn: getBrands,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['cars', defaultFilters],
      queryFn: ({ pageParam = initialPage }) =>
        getCars({
          ...defaultFilters,
          page: String(pageParam),
          limit: String(limit),
        }),
      initialPageParam: initialPage,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
