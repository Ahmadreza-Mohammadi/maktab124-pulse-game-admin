import { useQuery } from "@tanstack/react-query";
import { getProductsData } from "../../components/utils/helper";
import MyChart from "../../components/chart/Chart";
import Loading from "../../components/loading/Loading";
import { digitsEnToFa } from "../../components/utils/helper";
import { Product, Statistics } from "../../components/interfaces/interface";

function HomeComponen() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProductsData,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center mr-64 bg-gray-700">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-screen flex items-center justify-center mr-64 bg-gray-700">
        Error fetching products.
      </div>
    );
  }

  // Calculate statistics
  const statistics: Statistics = {
    totalProducts: products?.length || 0,
    totalStock:
      products?.reduce((sum: number, product: Product) => {
        const quantity =
          typeof product.quantity === "string"
            ? parseInt(product.quantity)
            : product.quantity;
        return sum + (quantity || 0);
      }, 0) || 0,
    outOfStockProducts:
      products?.filter((product: Product) => !product.stock).length || 0,
  };

  return (
    <div className="w-full min-h-screen bg-gray-700 p-8 mr-64">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          به پنل ادمین پالس گیم خوش آمدید!
        </h1>
        <p className="text-gray-300">مدیریت و نظارت بر محصولات و موجودی</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 mb-2">تعداد کل محصولات</h3>
          <p className="text-3xl font-bold text-emerald-400">
            {digitsEnToFa(statistics.totalProducts)}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 mb-2">موجودی کل</h3>
          <p className="text-3xl font-bold text-blue-400">
            {digitsEnToFa(statistics.totalStock)}
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-400 mb-2">محصولات ناموجود</h3>
          <p className="text-3xl font-bold text-red-400">
            {digitsEnToFa(statistics.outOfStockProducts)}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">
          نمودار فروش محصولات
        </h2>
        <div className="flex justify-center">
          <MyChart />
        </div>
      </div>
    </div>
  );
}

export default HomeComponen;
