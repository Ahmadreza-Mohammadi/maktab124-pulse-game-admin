import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL } from "../api/api";

interface EditInventoryModalProps {
  onCancel: () => void;
  onConfirm?: () => void;
  product: {
    id: number;
    title: string;
    quantity: number;
    category: string;
  };
}

interface FormErrors {
  quantity?: string;
}

function EditInventoryModal({
  onCancel,
  onConfirm,
  product,
}: EditInventoryModalProps) {
  const [formData, setFormData] = useState({
    quantity: product.quantity.toString(),
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function validateInputs(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.quantity.trim()) {
      newErrors.quantity = "تعداد را وارد کنید.";
    } else if (
      isNaN(Number(formData.quantity)) ||
      Number(formData.quantity) < 0
    ) {
      newErrors.quantity = "تعداد باید یک عدد مثبت باشد.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function EditInventoryHandler() {
    if (!validateInputs()) return;

    try {
      const updatedProduct = {
        ...product,
        quantity: parseInt(formData.quantity),
        stock: parseInt(formData.quantity) > 0,
      };

      await axios.put(
        `${BASE_URL}/api/records/products/${product.id}`,
        updatedProduct,
        {
          headers: {
            api_key: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      if (onConfirm) {
        onConfirm();
      }

      onCancel();
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-blur-xl"></div>

      <div className="w-[400px] flex flex-col p-6 relative items-center justify-center bg-gray-800/90 border border-gray-700 shadow-lg rounded-2xl z-10">
        <div className="text-center flex flex-col gap-4">
          <img
            className="h-16"
            src="https://www.svgrepo.com/show/422395/edit-interface-multimedia.svg"
            alt=""
          />
          <h2 className="text-2xl font-bold text-gray-200">ویرایش موجودی</h2>
        </div>

        <div className="flex flex-col gap-5 mt-4 w-full">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-200">
              نام محصول:
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200"
              value={product.title}
              disabled
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-sm font-medium text-gray-200">تعداد:</label>
            <input
              type="number"
              name="quantity"
              className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200"
              value={formData.quantity}
              onChange={handleInputChange}
            />
            {errors.quantity && (
              <span className="text-sm text-red-500">{errors.quantity}</span>
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
            onClick={EditInventoryHandler}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full cursor-pointer text-white font-semibold shadow-md transition duration-300"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditInventoryModal;
