import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL } from "../api/api";
import { EditProductModalProps, FormErrors } from "../interfaces/interface";
import EditModalContent from "../edit-modal-content/EditModalContent";

function EditProductModal({
  onCancel,
  onConfirm,
  product,
}: EditProductModalProps) {
  // Initialize images array properly
  const initialImages =
    product.img && product.img.length > 0 ? [...product.img] : [""];

  const [formData, setFormData] = useState({
    title: product.title,
    creator: product.creator,
    quantity: Number(product.quantity),
    releaseYear: product.releaseYear,
    category: product.category,
    gameCategory: product.gameCategory,
    description: product.description,
    img: initialImages,
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
    const newImages = [...formData.img];
    newImages[index] = value;
    setFormData({ ...formData, img: newImages });
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      img: [...prev.img, ""],
    }));
  };

  const removeImageField = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      img: prev.img.filter((_, i) => i !== index),
    }));
  };

  function validateInputs(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = "عنوان را وارد  کنید.";
    if (!formData.creator.trim())
      newErrors.creator = "نام سازنده را وارد کنید.";
    if (!formData.quantity.toString().trim())
      newErrors.quantity = "تعداد را وارد کنید.";
    if (!formData.releaseYear)
      newErrors.releaseYear = "سال انتشار را وارد کنید.";
    if (!formData.category.trim())
      newErrors.category = "دسته بندی را وارد کنید.";
    if (!formData.description) newErrors.description = "توضیحات را وارد کنید.";
    if (formData.img.some((img) => !img || !img.trim()))
      newErrors.img = "لینک تصاویر را وارد کنید.";
    if (formData.category === "game" && !formData.gameCategory.trim()) {
      newErrors.gameCategory = "لطفا دسته بندی بازی را انتخاب کنید";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function EditProductHandler() {
    if (!validateInputs()) return;

    try {
      const updatedFormData = {
        ...formData,
        stock: parseInt(formData.quantity.toString()) > 0,
      };

      const response = await axios.put(
        `${BASE_URL}/api/records/products/${product.id}`,
        updatedFormData,
        {
          headers: {
            api_key: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Edit response:", response);

      if (onConfirm) {
        onConfirm();
      }

      onCancel();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  }

  return (
    <EditModalContent
      formData={formData}
      errors={errors}
      handleInputChange={handleInputChange}
      handleImageChange={handleImageChange}
      addImageField={addImageField}
      removeImageField={removeImageField}
      editProductHandler={EditProductHandler}
      onCancel={onCancel}
    />
  );
}

export default EditProductModal;
