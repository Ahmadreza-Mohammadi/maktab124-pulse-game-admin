import { useQuery } from "@tanstack/react-query";
import ProductsTable from "../../components/tables/products-table/ProductsTable";
import { getProductsData } from "../../components/utils/helper";

function Products() {
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

  return <ProductsTable products={data} />;
}

export default Products;
