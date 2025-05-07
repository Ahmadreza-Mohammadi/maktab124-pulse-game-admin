import { useState, useEffect } from "react";
import { digitsEnToFa, formatPrice } from "../../utils/helper";
import { API_KEY, BASE_URL } from "../../api/api";
import axios from "axios";
import OrderDetailsModal from "../../modal/OrderDetailsModal";
import DeliveryStatusModal from "../../modal/DeliveryStatusModal";
import { Order } from "../../interfaces/interface";

function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<
    "همه" | "paid" | "pending"
  >("همه");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingDeliveryStatus, setEditingDeliveryStatus] =
    useState<Order | null>(null);
  const productsPerPage = 10;

  async function getOrders() {
    try {
      const response = await axios.get<{ records: Order[] }>(
        `${BASE_URL}/api/records/orders`,
        {
          headers: {
            api_key: API_KEY,
          },
        }
      );
      if (response.data.records && Array.isArray(response.data.records)) {
        setOrders(response.data.records);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  // Filter orders by status
  const filteredOrders =
    selectedStatus === "همه"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Handle status change
  const handleStatusChange = (status: string) => {
    setSelectedStatus(status as "همه" | "paid" | "pending");
    setCurrentPage(1);
  };

  // Get unique statuses
  const statuses = ["همه", "paid", "pending"];

  // Handle page change
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleShowOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleEditDeliveryStatus = (order: Order) => {
    setEditingDeliveryStatus(order);
  };

  const handleCloseDeliveryStatusModal = () => {
    setEditingDeliveryStatus(null);
  };

  const handleUpdateDeliveryStatus = async (
    orderId: string,
    newStatus: string
  ) => {
    try {
      // Update the order in the backend
      await axios.put(
        `${BASE_URL}/api/records/orders/${orderId}`,
        { deliveryStatus: newStatus },
        {
          headers: {
            api_key: API_KEY,
          },
        }
      );

      // Update the local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, deliveryStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  function renderPageNumbers() {
    const pageNumbers = [];

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
    console.log(currentOrders);
    return pageNumbers.map((pageNumber, index) => {
      if (pageNumber === "...") {
        return (
          <span key={`ellipsis-${index}`} className="px-3 py-1">
            ...
          </span>
        );
      }
      return (
        <button
          key={`page-${pageNumber}`}
          onClick={() => goToPage(pageNumber as number)}
          className={`px-3 py-1 rounded-md cursor-pointer ${
            currentPage === pageNumber
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {typeof pageNumber === "number"
            ? digitsEnToFa(pageNumber.toString())
            : pageNumber}
        </button>
      );
    });
  }

  return (
    <div className="w-full min-h-screen bg-gray-700 flex flex-col items-center p-4 mr-64">
      {/* Filter Bar */}
      <div className="flex justify-between items-center w-full max-w-6xl bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <span className="text-white text-lg font-semibold">وضعیت پرداخت:</span>
        <select
          value={selectedStatus}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="px-4 py-2 rounded-md bg-gray-200 focus:outline-none text-gray-800 hover:bg-gray-300 transition ease-in-out duration-200"
        >
          {statuses.map((status, index) => (
            <option key={`status-${index}`} value={status}>
              {status === "همه"
                ? "همه"
                : status === "paid"
                ? "پرداخت شده"
                : "در انتظار پرداخت"}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full max-w-6xl h-2/3 bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <table className="w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-right">نام</th>
              <th className="py-3 px-4 text-right">شناسه</th>
              <th className="py-3 px-4 text-right">تاریخ ثبت</th>
              <th className="py-3 px-4 text-right">وضعیت پرداخت</th>
              <th className="py-3 px-4 text-right">وضعیت ارسال</th>
              <th className="py-3 px-4 text-right">مجموع قیمت</th>
              <th className="py-3 px-4 text-right">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map((order: Order, index: number) => (
              <tr
                key={order.id || `order-${index}`}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-3 px-4 text-right">
                  {order.userInfo?.name || "-"}
                </td>
                <td className="py-3 px-4 text-right">{order.id || "-"}</td>
                <td className="py-3 px-4 text-right">
                  {order.orderDate || "-"}
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`rounded-full text-xs px-2 py-1 ${
                      order.payment === "paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.payment === "paid"
                      ? "پرداخت شده"
                      : "در انتظار پرداخت"}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    onClick={() => handleEditDeliveryStatus(order)}
                    className={`rounded-full text-xs px-2 py-1 cursor-pointer ${
                      order.deliveryStatus === "delivered"
                        ? "bg-green-100 text-green-800"
                        : order.deliveryStatus === "processing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {order.deliveryStatus === "delivered"
                      ? "تحویل داده شده"
                      : order.deliveryStatus === "processing"
                      ? "در حال پردازش"
                      : "ارسال شده"}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  {formatPrice(order.totalAmount)} تومان
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
                    title="نمایش"
                    onClick={() => handleShowOrder(order)}
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={handleCloseModal} />
      )}

      {/* Delivery Status Modal */}
      {editingDeliveryStatus && (
        <DeliveryStatusModal
          order={editingDeliveryStatus}
          onClose={handleCloseDeliveryStatusModal}
          onUpdateStatus={handleUpdateDeliveryStatus}
        />
      )}
    </div>
  );
}

export default OrdersTable;
