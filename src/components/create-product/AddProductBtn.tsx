function AddProductBtn({ onConfirm }: any) {
  return (
    <button
      onClick={onConfirm}
      className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full cursor-pointer text-white font-semibold shadow-md transition duration-300"
    >
      تایید
    </button>
  );
}

export default AddProductBtn;
