import { OrderDetailsModalProps } from "../interfaces/interface";
import {  formatPrice } from "../utils/helper";



function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      <div className="w-[600px] max-h-[80vh] flex flex-col p-6 relative items-center bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl text-gray-200 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
        <div className="w-full flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">جزئیات سفارش</h2>
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
          {/* Order Information */}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <span className="text-gray-400">شناسه سفارش:</span>
              <span className="text-white font-medium">{order.id}</span>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
              <span className="text-gray-400">تاریخ سفارش:</span>
              <span className="text-white font-medium">{order.orderDate}</span>
            </div>

            {/* User Information */}
            <div className="p-4 bg-gray-800 rounded-lg space-y-3">
              <h3 className="text-lg font-semibold mb-2">اطلاعات مشتری</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">نام:</span>
                <span className="text-white">{order.userInfo.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">ایمیل:</span>
                <span className="text-white">{order.userInfo.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">تلفن:</span>
                <span className="text-white">{order.userInfo.phone}</span>
              </div>
            </div>

            {/* Payment Information */}
            <div className="p-4 bg-gray-800 rounded-lg space-y-3">
              <h3 className="text-lg font-semibold mb-2">اطلاعات پرداخت</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">وضعیت پرداخت:</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    order.payment === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.payment === "paid" ? "پرداخت شده" : "در انتظار پرداخت"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">مبلغ کل:</span>
                <span className="text-white">
                  {formatPrice(order.totalAmount)} تومان
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsModal;
