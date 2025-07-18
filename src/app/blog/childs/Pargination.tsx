// components/Pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  return (
    <div className="flex justify-center mt-10">
      <nav className="flex items-center space-x-2">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &laquo;
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button key={page} className={`px-3 py-1 rounded-md ${page === currentPage ? "bg-blue-600 text-white" : "bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600"}`}>
            {page}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &raquo;
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
