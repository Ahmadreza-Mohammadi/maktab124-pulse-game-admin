import { useQuery } from "@tanstack/react-query";
import InventoryTable from "../../components/tables/inventory-table/InventoryTable";
import { getProductsData } from "../../components/utils/helper";
import Loading from "../../components/loading/Loading";

function Inventory() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-700 mr-64">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-700">
        Error fetching products.
      </div>
    );
  }

  return (
    <>
      <InventoryTable products={data} />
    </>
  );
}

export default Inventory;
