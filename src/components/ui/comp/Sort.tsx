import { SortProps } from '@/types'; 
  
  const Sort: React.FC<SortProps> = ({ handleSort, clearSearch, sortAsc }) => (
    <div className="flex justify-center space-x-2 mb-4">
      <button
        onClick={handleSort}
        className="ms-2 p-3 bg-indigo-100 hover:bg-indigo-200 text-gray-700 rounded-lg shadow-md"
      >
        Sort {sortAsc ? '[A-Z]' : '[Z-A]'}
      </button>
      <button
        onClick={clearSearch}
        className="ms-2 p-3 bg-red-100 hover:bg-red-200 text-gray-700 rounded-lg shadow-md"
      >
        Clear Search
      </button>
    </div>
  );
  
  export default Sort;
  