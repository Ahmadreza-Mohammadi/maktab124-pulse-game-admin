import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  AddProductModalProps,
  ProductData,
  FormErrors,
} from "../../interfaces/interface";
import { API_KEY } from "../../api/api";
import { BASE_URL } from "../../api/api";
import ModalContent from "./ModalContent";

function AddProductModal({ onCancel }: AddProductModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ProductData>({
    title: "",
    creator: "",
    quantity: "",
    releaseYear: "",
    category: "",
    gameCategory: "",
    description: "",
    images: [""], // Initialize with one empty image field
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeImageField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  function validateInputs(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = "عنوان را وارد  کنید.";
    if (!formData.creator.trim())
      newErrors.creator = "نام سازنده را وارد کنید.";
    if (!formData.quantity.trim()) newErrors.quantity = "تعداد را وارد کنید.";
    if (!formData.releaseYear.trim())
      newErrors.releaseYear = "سال انتشار را وارد کنید.";
    if (!formData.category.trim())
      newErrors.category = "دسته بندی را وارد کنید.";
    if (!formData.description.trim())
      newErrors.description = "توضیحات را وارد کنید.";
    if (formData.images.some((img) => !img.trim()))
      newErrors.images = "لینک تصاویر را وارد کنید.";
    if (formData.category === "game" && !formData.gameCategory.trim()) {
      newErrors.gameCategory = "لطفا دسته بندی بازی را انتخاب کنید";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function AddProductHandler() {
    if (!validateInputs()) return;

    try {
      await axios.post(
        `${BASE_URL}/api/records/products`,
        JSON.stringify(formData),
        {
          headers: {
            api_key: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      // Reset formn
      setFormData({
        title: "",
        creator: "",
        quantity: "",
        releaseYear: "",
        category: "",
        gameCategory: "",
        description: "",
        images: [""],
      });
      setErrors({});

      // Invalidate and refetch products query
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Close modal
      onCancel();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  return (
    <ModalContent
      formData={formData}
      errors={errors}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      addImageField={addImageField}
      removeImageField={removeImageField}
      onCancel={onCancel}
      AddProductHandler={AddProductHandler}
    />
  );
}

export default AddProductModal;
