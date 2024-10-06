import { Input } from "@/components/ui/input";

interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, setSearch, handleSearch }) => (
  <Input
    placeholder="Search albums"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyUp={handleSearch}
    className="mb-4 w-full p-2"
  />
);

export default SearchBar;
