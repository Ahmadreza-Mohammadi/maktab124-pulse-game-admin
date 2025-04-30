import { useState } from "react";
import { digitsEnToFa } from "../../utils/helper";
import Pagination from "../../pagination/Pagination";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryProduct } from "../../interfaces/interface";

function InventoryTable({ products }: { products: InventoryProduct[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [editingProduct, setEditingProduct] = useState<InventoryProduct | null>(
    null
  );
  const [editValue, setEditValue] = useState<string>("");
  const productsPerPage = 10;
  const queryClient = useQueryClient();

  // Mutation to handle product updates
  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct: InventoryProduct) => {
      const response = await axios.put(
        `${BASE_URL}/api/records/products/${updatedProduct.id}`,
        updatedProduct,
        {
          headers: {
            api_key: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch products query
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setEditingProduct(null);
      setEditValue("");
    },
  });

  // Filter products only by category (include all stock values)
  const filteredProducts =
    selectedCategory === "همه"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Handle double click to start editing
  const handleDoubleClick = (product: InventoryProduct, field: "quantity") => {
    setEditingProduct(product);
    setEditValue(product[field].toString());
  };

  // Handle input change while editing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // Handle save after editing
  const handleSave = async () => {
    if (!editingProduct) return;

    const updatedProduct = {
      ...editingProduct,
      quantity: parseInt(editValue) || 0,
      stock: parseInt(editValue) > 0,
    };

    updateProductMutation.mutate(updatedProduct);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditingProduct(null);
      setEditValue("");
    }
  };

  const categories = [
    "همه",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="w-full min-h-screen bg-gray-700 flex flex-col items-center p-4 mr-64">
      {/* Filter Bar */}
      <div className="flex justify-between items-center w-full max-w-6xl bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <span className="text-white text-lg font-semibold">دسته‌بندی:</span>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-200 focus:outline-none text-gray-800 hover:bg-gray-300 transition ease-in-out duration-200"
        >
          {categories.map((category, index) => (
            <option key={`category-${index}`} value={category}>
              {category === "همه" ? "همه" : category}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-6xl h-2/3 bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-right">نام</th>
              <th className="py-3 px-4 text-right">تعداد موجود</th>
              <th className="py-3 px-4 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product, index) => (
              <tr
                key={`product-${index}`}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4 text-right">{product.title}</td>
                <td
                  className="py-3 px-4 text-right cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(product, "quantity")}
                >
                  {editingProduct?.id === product.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button
                        onClick={handleSave}
                        className="p-1 text-green-600 hover:text-green-700 transition-colors"
                        title="تایید تغییرات"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    digitsEnToFa(product.quantity)
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.quantity > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.quantity > 0 ? "موجود" : "ناموجود"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default InventoryTable;
