import { useQuery } from "@tanstack/react-query";
import ProductsTable from "../../components/tables/products-table/ProductsTable";
import { ACCESS_TOKEN, BASE_URL, API_KEY } from "../../components/api/api";

function Products() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/api/records/my-products`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ACCESS_TOKEN}`, 
          "api_key": API_KEY, 
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json(); 
    },
  });


  return (
    <>
      <ProductsTable products={data} />
    </>
  );
}

export default Products;
