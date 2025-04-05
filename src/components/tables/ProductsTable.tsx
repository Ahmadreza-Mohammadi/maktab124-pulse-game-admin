import { useState } from "react";
import { products } from "../../database/products";
import { digitsEnToFa } from "../utils/helper";

function ProductsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const productsPerPage = 10;

  // Filter products by category
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
    setCurrentPage(1); // Reset to the first page when the category changes
  };

  // Get unique categories
  const categories = ["همه", ...new Set(products.map((product) => product.category))];

  // Handle page change
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  function renderPageNumbers() {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Adjust this number as needed

    pageNumbers.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 3, 2);
    }

    if (startPage > 2) {
      pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((pageNumber, index) => {
      if (pageNumber === "...") {
        return (
          <span key={index} className="px-3 py-1">
            ...
          </span>
        );
      }
      return (
        <button
          key={index}
          onClick={() => goToPage(pageNumber as number)}
          className={`px-3 py-1 rounded-md cursor-pointer ${
            currentPage === pageNumber
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {typeof pageNumber === "number"
            ? digitsEnToFa(pageNumber)
            : pageNumber}
        </button>
      );
    });
  }

  return (
    <div className="w-full min-h-screen bg-gray-700 flex flex-col items-center p-4 mr-80">
      {/* Filter Bar */}
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-200 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-right">نام</th>
              <th className="py-3 px-4 text-right">دسته‌بندی</th>
              <th className="py-3 px-4 text-right">سازنده</th>
              <th className="py-3 px-4 text-right">تعداد موجود</th>
              <th className="py-3 px-4 text-right">وضعیت</th>
              <th className="py-3 px-4 text-right">سال انتشار</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product: any, index: number) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4 text-right">{product.title}</td>
                <td className="py-3 px-4 text-right">{product.category}</td>
                <td className="py-3 px-4 text-right">{product.creator}</td>
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
                    {(product.stock && "موجود") || "ناموجود"}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  {digitsEnToFa(product.releaseYear)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => goToPage(1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition cursor-pointer"
        >
          اولین
        </button>
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition cursor-pointer"
        >
          قبلی
        </button>
        <div className="flex gap-1">{renderPageNumbers()}</div>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition cursor-pointer"
        >
          بعدی
        </button>
        <button
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition cursor-pointer"
        >
          آخرین
        </button>
      </div>
    </div>
  );
}

export default ProductsTable;
