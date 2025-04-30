import { digitsEnToFa } from "../utils/helper";

function Pagination({currentPage, totalPages, setCurrentPage}:any) {
 function renderPageNumbers() {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    pageNumbers.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 3, 2);
    }

    if (startPage > 2) {
      pageNumbers.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((pageNumber, index) => {
      if (pageNumber === "...") {
        return (
          <span key={`ellipsis-${index}`} className="px-3 py-1">
            ...
          </span>
        );
      }
      return (
        <button
          key={`page-${pageNumber}`}
          onClick={() => goToPage(pageNumber as number)}
          className={`px-3 py-1 rounded-md cursor-pointer ${
            currentPage === pageNumber
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {digitsEnToFa(pageNumber)}
        </button>
      );
    });
  }

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
          setCurrentPage(page);
        }
      };
  return (
    <div className="flex items-center gap-2">
    <button
      onClick={() => goToPage(1)}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition cursor-pointer"
    >
      اولین
    </button>
    <button
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition cursor-pointer"
    >
      قبلی
    </button>
    <div className="flex gap-1">{renderPageNumbers()}</div>
    <button
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition cursor-pointer"
    >
      بعدی
    </button>
    <button
      onClick={() => goToPage(totalPages)}
      disabled={currentPage === totalPages}
      className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300 transition cursor-pointer"
    >
      آخرین
    </button>
  </div>
  )
}

export default Pagination