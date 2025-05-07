import { ModalContentProps } from "../../interfaces/interface";

function ModalContent({
  formData,
  errors,
  handleInputChange,
  handleImageChange,
  addImageField,
  removeImageField,
  onCancel,
  AddProductHandler,
}: ModalContentProps) {
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

          {/* Multiple Image Inputs */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium">تصاویر محصول:</label>
            {formData.images.map((image, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-600 bg-gray-800 px-4 py-2"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`لینک تصویر ${index + 1}`}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeImageField(index)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                  >
                    حذف
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md self-start"
            >
              افزودن تصویر جدید
            </button>
            {errors.images && (
              <span className="text-sm text-red-500">{errors.images}</span>
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
              <label className="text-sm font-medium">دسته بندی بازی:</label>
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
                <span className="text-sm text-red-500">
                  {errors.gameCategory}
                </span>
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
            انصراف
          </button>
          <button
            onClick={AddProductHandler}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full cursor-pointer text-white font-semibold shadow-md transition duration-300"
          >
            افزودن محصول
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalContent;
