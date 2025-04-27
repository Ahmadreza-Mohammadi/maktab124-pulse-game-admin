import { Product } from "../interfaces/interface";
import { digitsEnToFa } from "../utils/helper";

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

function ProductDetailsModal({ product, onClose }: ProductDetailsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      <div className="w-[600px] max-h-[80vh] flex flex-col p-6 relative items-center bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl text-gray-200 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">جزئیات محصول</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="w-full space-y-6">
          {/* Product Images */}
          <div className="grid grid-cols-2 gap-4">
            {product.img?.map((image: string, index: number) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
              </div>
            ))}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <span className="text-gray-400">عنوان:</span>
              <span className="text-white font-medium">
                {product.title || "-"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <span className="text-gray-400">سازنده:</span>
              <span className="text-white font-medium">
                {product.creator || "-"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <span className="text-gray-400">دسته‌بندی:</span>
              <span className="text-white font-medium">
                {product.category || "-"}
              </span>
            </div>

            {product.gameCategory && (
              <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                <span className="text-gray-400">دسته‌بندی بازی:</span>
                <span className="text-white font-medium">
                  {product.gameCategory}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <span className="text-gray-400">تعداد موجودی:</span>
              <span className="text-white font-medium">
                {digitsEnToFa(product.quantity?.toString() || "0")}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <span className="text-gray-400">سال انتشار:</span>
              <span className="text-white font-medium">
                {digitsEnToFa(product.releaseYear || "-")}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-4 bg-gray-800 rounded-lg">
              <span className="text-gray-400">توضیحات:</span>
              <p className="text-white">{product.description || "-"}</p>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <span className="text-gray-400">وضعیت موجودی:</span>
              <span
                className={`font-medium ${
                  product.stock ? "text-green-500" : "text-red-500"
                }`}
              >
                {product.stock ? "موجود" : "ناموجود"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;
