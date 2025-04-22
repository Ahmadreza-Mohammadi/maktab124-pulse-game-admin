import { useState } from "react";
import { categories } from "../constants/const";
import AddProductBtn from "../create-product/AddProductBtn";

interface AddProductModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function AddProductModal({ onConfirm, onCancel }: AddProductModalProps) {
  const [title, setTitle] = useState("");
  const [creator, setCreator] = useState("");
  const [quantity, setQuantity] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [category, setCategory] = useState("");
  const [gameCategory, setGameCategory] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-xl"></div>

      <div className="w-[560px] h-[740px] flex flex-col p-6 justify-between relative items-center bg-gray-900 border border-gray-700 shadow-2xl rounded-2xl text-gray-200">
        <div className="text-center flex flex-col gap-4">
          <img
            className="h-16"
            src="https://www.svgrepo.com/show/386805/add-one.svg"
            alt=""
          />
          <h2 className="text-2xl font-bold">افزودن محصول جدید</h2>
        </div>

        <div className="flex flex-col gap-5 mt-4 w-full overflow-y-auto max-h-[400px] px-2 custom-scrollbar">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">عنوان:</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 focus:border-blue-400 focus:ring focus:ring-blue-300 outline-none shadow-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">سازنده:</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 focus:border-blue-400 focus:ring focus:ring-blue-300 outline-none shadow-md"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">تعداد:</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 focus:border-blue-400 focus:ring focus:ring-blue-300 outline-none shadow-md"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">سال انتشار:</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 focus:border-blue-400 focus:ring focus:ring-blue-300 outline-none shadow-md"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </div>
      
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">
            لینک تصویر:
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 focus:border-blue-400 focus:ring focus:ring-blue-300 outline-none shadow-md"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>

          {/* Select Dropdown */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">دسته بندی:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 focus:border-blue-400 focus:ring focus:ring-blue-300 outline-none shadow-md"
            >
              <option value="" disabled selected>
                انتخاب کنید
              </option>
              <option value="game">بازی</option>
              <option value="headset">هدست</option>
              <option value="chair">صندلی گیمینگ</option>
              <option value="console">کنسول</option>
              <option value="keyboard">کیبورد</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">توضیحات:</label>

            <textarea
              name=""
              id=""
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full cursor-pointer text-white font-semibold shadow-md transition duration-300"
          >
            لغو
          </button>
          <AddProductBtn
            onConfirm={onConfirm}
            title={title}
            creator={creator}
            quantity={quantity}
            releaseYear={releaseYear}
            gameCategory={gameCategory}
            category={category}
            description-={description}
          />
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;
