import { Order } from "../interfaces/interface";

interface DeliveryStatusModalProps {
  order: Order;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: string) => void;
}

function DeliveryStatusModal({
  order,
  onClose,
  onUpdateStatus,
}: DeliveryStatusModalProps) {
  const deliveryStatuses = [
    {
      value: "processing",
      label: "در حال پردازش",
      icon: "🔄",
      description: "سفارش در حال بررسی و آماده‌سازی است",
    },
    {
      value: "shipped",
      label: "ارسال شده",
      icon: "📦",
      description: "سفارش ارسال شده و در مسیر است",
    },
    {
      value: "delivered",
      label: "تحویل داده شده",
      icon: "✅",
      description: "سفارش با موفقیت تحویل داده شده است",
    },
  ];

  const handleStatusChange = (newStatus: string) => {
    onUpdateStatus(order.id, newStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="w-[500px] max-h-[90vh] flex flex-col p-8 relative items-center bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 shadow-2xl rounded-3xl text-gray-200 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              ویرایش وضعیت ارسال
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-xl transition-colors"
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
            <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-400">شناسه سفارش</span>
                <span className="text-white font-medium bg-gray-700/50 px-3 py-1 rounded-lg">
                  {order.id}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">وضعیت فعلی</span>
                <span
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    order.deliveryStatus === "delivered"
                      ? "bg-green-500/10 text-green-400"
                      : order.deliveryStatus === "processing"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-purple-500/10 text-purple-400"
                  }`}
                >
                  {order.deliveryStatus === "delivered"
                    ? "تحویل داده شده"
                    : order.deliveryStatus === "processing"
                    ? "در حال پردازش"
                    : "ارسال شده"}
                </span>
              </div>
            </div>

            {/* Status Selection */}
            <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">
                انتخاب وضعیت جدید
              </h3>
              <div className="space-y-3">
                {deliveryStatuses.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => handleStatusChange(status.value)}
                    className={`w-full p-4 rounded-xl text-right transition-all duration-200 flex items-center gap-4 cursor-pointer ${
                      order.deliveryStatus === status.value
                        ? "bg-blue-500/10 border-2 border-blue-500/50"
                        : "bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50"
                    }`}
                  >
                    <span className="text-2xl">{status.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium mb-1">{status.label}</div>
                      <div className="text-sm text-gray-400">
                        {status.description}
                      </div>
                    </div>
                    {order.deliveryStatus === status.value && (
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryStatusModal;
