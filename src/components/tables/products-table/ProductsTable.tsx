import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../utils/deleteProduct";
import DeleteModal from "../../modal/DeleteModal";
import EditProductModal from "../../modal/EditProductModal";
import Pagination from "../../pagination/Pagination";
import MyTable from "./Table";
import ProductsTableHeader from "./ProductsTableHeader";
import { Product } from "../../interfaces/interface";

interface ProductsTableProps {
  products: Product[];
}

function ProductsTable({ products }: ProductsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const queryClient = useQueryClient();
  const productsPerPage = 10;

  // Mutation to handle deletion
  const mutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowDeleteModal(false);
      setProductToDelete(null);
    },
  });

  // Handle delete button click
  const handleDeleteClick = (id: number) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  // Handle edit button click
  const handleEditClick = (product: Product) => {
    setProductToEdit(product);
    setShowEditModal(true);
  };

  // Handle modal cancel
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setProductToEdit(null);
  };

  const handleConfirmEdit = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
    setShowEditModal(false);
    setProductToEdit(null);
  };

  // Handle modal confirm
  const handleConfirmDelete = () => {
    if (productToDelete !== null) {
      mutation.mutate(productToDelete);
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Filter products by category and search query
  const filteredProducts = products.filter((product: Product) => {
    const matchesCategory =
      selectedCategory === "همه" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      <ProductsTableHeader
        products={products}
        handleCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
        onSearch={handleSearch}
      />

      {/* Product Table */}
      <MyTable
        products={currentProducts}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && productToEdit && (
        <EditProductModal
          product={productToEdit}
          onCancel={handleCancelEdit}
          onConfirm={handleConfirmEdit}
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
