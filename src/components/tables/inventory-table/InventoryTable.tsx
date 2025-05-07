import { useState } from "react";
import { digitsEnToFa } from "../../utils/helper";
import Pagination from "../../pagination/Pagination";
import { InventoryProduct } from "../../interfaces/interface";
import { API_KEY, BASE_URL } from "../../api/api";
import axios from "axios";

function InventoryTable({ products }: { products: InventoryProduct[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [editingProduct, setEditingProduct] = useState<InventoryProduct | null>(
    null
  );
  const [isSaving, setIsSaving] = useState(false);
  const productsPerPage = 10;

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

  // Handle product click
  const handleProductClick = (product: InventoryProduct) => {
    setEditingProduct(product);
  };

  // Handle input change
  const handleInputChange = (field: "quantity" | "price", value: string) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      [field]: parseInt(value) || 0,
    });
  };

  // Handle save
  const handleSave = async () => {
    if (!editingProduct || isSaving) return;
    setIsSaving(true);

    try {
      const { id, ...productData } = editingProduct;
      const response = await axios.put(
        `${BASE_URL}/api/records/products/${id}`,
        {
          ...productData,
          stock: productData.quantity > 0,
        },
        {
          headers: {
            api_key: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Product updated:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("خطا در ذخیره تغییرات. لطفا دوباره تلاش کنید.");
    } finally {
      setIsSaving(false);
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
              <th className="py-3 px-4 text-right">قیمت(تومان)</th>
              <th className="py-3 px-4 text-right">وضعیت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product, index) => (
              <tr
                key={`product-${index}`}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
                  editingProduct?.id === product.id ? "bg-yellow-50" : ""
                } cursor-pointer hover:bg-gray-100`}
                onClick={() => handleProductClick(product)}
              >
                <td className="py-3 px-4 text-right">{product.title}</td>
                <td className="py-3 px-4 text-right">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.quantity}
                      onChange={(e) =>
                        handleInputChange("quantity", e.target.value)
                      }
                      className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    digitsEnToFa(product.quantity)
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  {editingProduct?.id === product.id ? (
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        handleInputChange("price", e.target.value)
                      }
                      className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    digitsEnToFa(product.price)
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

      {/* Save Button */}
      {editingProduct && (
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 rounded ${
              isSaving
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white transition-colors`}
          >
            {isSaving ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </button>
          <button
            onClick={() => setEditingProduct(null)}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-white transition-colors"
          >
            انصراف
          </button>
        </div>
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

export default InventoryTable;
