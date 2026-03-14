import CarList from "@/components/CarList/CarList";
import { getCars } from '@/lib/api/clientApi';

async function CatalogPage() {
  const data = await getCars();

  return (
    <main className="main">
      <div className="container">
        <CarList cars={data.cars} />
      </div>
    </main>
  );
}

export default CatalogPage;