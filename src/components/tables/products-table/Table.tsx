import { categoryLabels, digitsEnToFa } from "../../utils/helper";

interface MyTableProps {
  products: any[];
  handleDeleteClick: (id: number) => void;
  handleEditClick: (product: any) => void;
}

function MyTable({
  products,
  handleDeleteClick,
  handleEditClick,
}: MyTableProps) {
  return (
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
          {products.map((product: any, index: number) => (
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
                  onClick={() => handleEditClick(product)}
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
  );
}

export default MyTable;
