import { useState } from "react";
import { categoryLabels } from "../../utils/helper";
import AddProductModal from "../../modal/AddProductModal";
import { Product } from "../../interfaces/interface";
import SearchBar from "./SearchBar";

interface ProductsTableHeaderProps {
  products: Product[];
  handleCategoryChange: (category: string) => void;
  selectedCategory: string;
  onSearch: (query: string) => void;
}

function ProductsTableHeader({
  products,
  handleCategoryChange,
  selectedCategory,
  onSearch,
}: ProductsTableHeaderProps) {
  const categories = [
    "همه",
    ...new Set(products.map((product) => product.category)),
  ];
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const handleAddProductClick = () => {
    setShowAddProductModal(true);
  };

  const handleCancelAddProduct = () => {
    setShowAddProductModal(false);
  };

  return (
    <>
      {showAddProductModal && (
        <AddProductModal onCancel={handleCancelAddProduct} />
      )}
      <div className="flex justify-between items-center w-full max-w-6xl bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <div className="relative group" onClick={handleAddProductClick}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95">
            افزودن محصول
            <img
              className="h-6 transition-transform duration-300 group-hover:rotate-90"
              src="https://cdn.iconscout.com/icon/premium/png-512-thumb/add-5279002-4402592.png?f=webp&w=512"
              alt="Add product"
            />
          </button>
          <span className="absolute -bottom-5 left-0 w-full h-1 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </div>
        <SearchBar onSearch={onSearch} />
        <div className="flex gap-4 items-center">
          <span className="text-white text-lg font-semibold">دسته‌بندی:</span>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-600 transition ease-in-out duration-200"
          >
            {categories.map((category, index) => (
              <option key={`category-${index}`} value={category}>
                {categoryLabels[category] || category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}

export default ProductsTableHeader;
