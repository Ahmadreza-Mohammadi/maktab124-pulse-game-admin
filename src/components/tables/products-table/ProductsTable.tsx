import { useState, useEffect } from "react";
import { categoryLabels, digitsEnToFa } from "../../utils/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../utils/deleteProduct";
import DeleteModal from "../../modal/DeleteModal";
import Pagination from "../../pagination/Pagination";

function ProductsTable({ products }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null); // Track product to delete
  const queryClient = useQueryClient();
  const productsPerPage = 10;

  // Mutation to handle deletion
  const mutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setShowDeleteModal(false); //
      setProductToDelete(null);
    },
  });

  // Handle delete button click
  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  // Handle modal cancel
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  // Handle modal confirm
  const handleConfirmDelete = () => {
    if (productToDelete !== null) {
      mutation.mutate(productToDelete);
    }
  };

  // Filter products by category
  const filteredProducts =
    selectedCategory === "همه"
      ? products
      : products.filter(
          (product: any) => product.category === selectedCategory
        );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Adjust pagination when a product is deleted
  useEffect(() => {
    if (currentProducts.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentProducts, currentPage]);

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const categories = [
    "همه",
    ...new Set(products.map((product: any) => product.category)),
  ];

  return (
    <div className="w-full min-h-screen bg-gray-700 flex flex-col items-center p-4 mr-64">
      {/* Filter Bar */}
      <div className="flex justify-between items-center w-full max-w-6xl bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <button className="bg-blue-400 p-1">افزودن محصوg</button>
        <div className="flex gap-4 items-center">
          <span className="text-white text-lg font-semibold">دسته‌بندی:</span>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-2 rounded-md bg-gray-200 focus:outline-none text-gray-800 hover:bg-gray-300 transition ease-in-out duration-200"
          >
            {categories.map((category, index) => (
              <option key={`category-${index}`} value={category}>
                {categoryLabels[category] || category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Table */}
      <div className="w-full max-w-6xl h-2/3 bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-center">نام</th>
              <th className="py-3 px-4 text-center">دسته‌بندی</th>
              <th className="py-3 px-4 text-center">سازنده</th>
              <th className="py-3 px-4 text-center">سال انتشار</th>
              <th className="py-3 px-4 text-center">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product: any, index: number) => (
              <tr
                key={`product-${index}`}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4 text-center">{product.title}</td>
                <td className="py-3 px-4 text-center">
                  {categoryLabels[product.category] || product.category}
                </td>
                <td className="py-3 px-4 text-center">{product.creator}</td>

                <td className="py-3 px-4 text-center">
                  {digitsEnToFa(product.releaseYear)}
                </td>
                <td className="py-3 px-4 flex gap-3 justify-center">
                  <button
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                    onClick={() => handleDeleteClick(product.id)}
                    title="حذف"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/489907/delete.svg"
                      alt="حذف محصول"
                    />
                  </button>
                  <button
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                    title="ویرایش"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/422395/edit-interface-multimedia.svg"
                      alt="ویرایش محصول"
                    />
                  </button>
                  <button
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
                    title="نمایش"
                  >
                    <img
                      className="h-5 w-5"
                      src="https://www.svgrepo.com/show/80986/show.svg"
                      alt="نمایش محصول"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default ProductsTable;
