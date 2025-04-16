import { Logout } from "@mui/icons-material";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteModal({ onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with intense blur */}
      <div className="absolute inset-0 backdrop-blur-xl"></div>

      {/* Modal content */}
      <div className="w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800/90 border border-gray-700 shadow-lg rounded-2xl z-10">
        <div className="text-center p-3 flex flex-col">
          <img className="h-16" src="https://www.svgrepo.com/show/94002/logout.svg" alt="" />
          <h2 className="text-xl font-bold py-4 text-gray-200">
            آیا میخواهید خارج شوید؟
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={onCancel}
            className="mb-2 md:mb-0 bg-gray-700 w-24 px-5 cursor-pointer py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
          >
            لغو
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-400 w-24 hover:bg-green-500 px-5 cursor-pointer ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
