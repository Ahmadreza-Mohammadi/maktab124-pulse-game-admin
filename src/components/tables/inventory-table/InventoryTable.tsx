import { useState } from "react";
import { digitsEnToFa } from "../../utils/helper";
import Pagination from "../../pagination/Pagination";

function InventoryTable({ products }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const productsPerPage = 10;

  // Filter products by category and stock
  const filteredProducts =
    selectedCategory === "همه"
      ? products.filter((product: any) => product.stock === true)
      : products.filter(
          (product: any) =>
            product.category === selectedCategory && product.stock === true
        );

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
    setCurrentPage(1); // Reset to the first page when the category changes
  };

  // Get unique categories
  const categories = [
    "همه",
    ...new Set(products.map((product: any) => product.category)),
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
            {currentProducts.map((product: any, index: number) => (
              <tr
                key={`product-${index}`}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4 text-right">{product.title}</td>
                <td className="py-3 px-4 text-right">
                  {digitsEnToFa(product.quantity)}
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.stock === true
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock && "موجود"}
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
