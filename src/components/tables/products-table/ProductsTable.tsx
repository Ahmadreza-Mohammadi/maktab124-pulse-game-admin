import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../utils/deleteProduct";
import DeleteModal from "../../modal/DeleteModal";
import Pagination from "../../pagination/Pagination";
import MyTable from "./Table";
import AddProduct from "./AddProduct";

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

 

  return (
    <div className="w-full min-h-screen bg-gray-700 flex flex-col items-center p-4 mr-64">
      {/* Filter Bar */}
     <AddProduct products={products} handleCategoryChange={handleCategoryChange} />

      {/* Product Table */}
   <MyTable products={currentProducts} handleDeleteClick={handleDeleteClick} selectedCategory={selectedCategory} />

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