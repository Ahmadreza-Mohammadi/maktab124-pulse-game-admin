import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL } from "../api/api";

interface AddProductModalProps {
  onCancel: () => void;
}

interface ProductData {
  title: string;
  creator: string;
  quantity: string;
  releaseYear: string;
  category: string;
  gameCategory: string;
  description: string;
  img: string;
}

interface FormErrors {
  title?: string;
  creator?: string;
  quantity?: string;
  releaseYear?: string;
  category?: string;
  gameCategory?: string;
  description?: string;
  img?: string;
}

function AddProductModal({ onCancel }: AddProductModalProps) {
  const [formData, setFormData] = useState<ProductData>({
    title: "",
    creator: "",
    quantity: "",
    releaseYear: "",
    category: "",
    gameCategory: "",
    description: "",
    img: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  function validateInputs(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = "عنوان را وارد  کنید.";
    if (!formData.creator.trim()) newErrors.creator = "نام سازنده را وارد کنید.";
    if (!formData.quantity.trim()) newErrors.quantity = "تعداد را وارد کنید.";
    if (!formData.releaseYear.trim()) newErrors.releaseYear = "سال انتشار را وارد کنید.";
    if (!formData.category.trim()) newErrors.category = "دسته بندی را وارد کنید.";
    if (!formData.description.trim()) newErrors.description = "توضیحات را وارد کنید.";
    if (!formData.img.trim()) newErrors.img = "لینک تصویر را وارد کنید.";
    if (formData.category === "game" && !formData.gameCategory.trim()) {
      newErrors.gameCategory = "لطفا دسته بندی بازی را انتخاب کنید";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function AddProductHandler() {
    if (!validateInputs()) return;

    try {
      await axios.post(`${BASE_URL}/api/records/posts`, JSON.stringify(formData), {
        headers: {
          api_key: API_KEY,
          "Content-Type": "application/json",
        },
      });

      // Reset form
      setFormData({
        title: "",
        creator: "",
        quantity: "",
        releaseYear: "",
        category: "",
        gameCategory: "",
        description: "",
        img: "",
      });
      setErrors({});
      
      // Close modal or show success message
      onCancel();
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error (show error message, etc.)
    }
  }

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
              name="title"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2"
              value={formData.title}
              onChange={handleInputChange}
            />
            {errors.title && (
              <span className="text-sm text-red-500">{errors.title}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">سازنده:</label>
            <input
              type="text"
              name="creator"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2"
              value={formData.creator}
              onChange={handleInputChange}
            />
            {errors.creator && (
              <span className="text-sm text-red-500">{errors.creator}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">تعداد:</label>
            <input
              type="number"
              name="quantity"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2"
              value={formData.quantity}
              onChange={handleInputChange}
            />
            {errors.quantity && (
              <span className="text-sm text-red-500">{errors.quantity}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">سال انتشار:</label>
            <input
              type="number"
              name="releaseYear"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2"
              value={formData.releaseYear}
              onChange={handleInputChange}
            />
            {errors.releaseYear && (
              <span className="text-sm text-red-500">{errors.releaseYear}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">لینک تصویر:</label>
            <input
              type="text"
              name="img"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2"
              value={formData.img}
              onChange={handleInputChange}
            />
            {errors.img && (
              <span className="text-sm text-red-500">{errors.img}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">دسته بندی:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2"
            >
              <option value="" disabled>
                انتخاب کنید
              </option>
              <option value="game">بازی</option>
              <option value="headset">هدست</option>
              <option value="chair">صندلی گیمینگ</option>
              <option value="console">کنسول</option>
              <option value="keyboard">کیبورد</option>
            </select>
            {errors.category && (
              <span className="text-sm text-red-500">{errors.category}</span>
            )}
          </div>

          {formData.category === "game" && (
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium">
                دسته بندی بازی:
              </label>
              <select
                name="gameCategory"
                value={formData.gameCategory}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2"
              >
                <option value="" disabled>
                  انتخاب کنید
                </option>
                <option value="actionAdventure">اکشن ماجراجویی</option>
                <option value="rpg">نقش آفرینی</option>
                <option value="action">اکشن</option>
                <option value="strategy">استراتژیک</option>
                <option value="adventure">ماجراجویی</option>
                <option value="sport">ورزشی</option>
                <option value="simulator">شبیه ساز</option>
              </select>
              {errors.gameCategory && (
                <span className="text-sm text-red-500">{errors.gameCategory}</span>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium">توضیحات:</label>
            <textarea
              name="description"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2"
              value={formData.description}
              onChange={handleInputChange}
            ></textarea>
            {errors.description && (
              <span className="text-sm text-red-500">{errors.description}</span>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full cursor-pointer text-white font-semibold shadow-md transition duration-300"
          >
            لغو
          </button>
          <button
            onClick={AddProductHandler}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full cursor-pointer text-white font-semibold shadow-md transition duration-300"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;