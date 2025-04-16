import { useQuery } from "@tanstack/react-query";
import InventoryTable from "../../components/tables/inventory-table/InventoryTable";
import { getProductsData } from "../../components/utils/helper";

function Inventory() {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-red-500">
        Loading...
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching products.</div>;
  }

  return (
    <>
      <InventoryTable products={data} />
    </>
  );
}

export default Inventory;
