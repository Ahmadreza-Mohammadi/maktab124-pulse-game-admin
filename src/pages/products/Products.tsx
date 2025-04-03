import ProductsTable from "../../components/tables/ProductsTable";

function Products() {
  return (
    <div className="w-full h-full bg-gray-500 flex  pr-80">
      <div className="w-320 mt-40 mb-30">
      <ProductsTable />
      </div>
      
    </div>
  );
}

export default Products;
