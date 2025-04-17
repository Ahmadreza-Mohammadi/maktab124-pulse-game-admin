import { useQuery } from "@tanstack/react-query";
import ProductsTable from "../../components/tables/products-table/ProductsTable";
import { getProductsData } from "../../components/utils/helper";
import Loading from "../../components/loading/Loading";

function Products() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center mr-64 bg-gray-700">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div className="w-full h-screen flex items-center justify-center mr-64 bg-gray-700">Error fetching products.</div>;
  }

  return <ProductsTable products={data} />;
}

export default Products;
