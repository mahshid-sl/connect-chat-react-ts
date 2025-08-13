import { RiSearch2Line } from "react-icons/ri";

export default function SearchBar() {
  return (
    <div className="relative flex items-center ">
      <input
        type="text"
        placeholder="Search"
        className="w-72 h-10
        px-3 py-2 rounded placeholder:text-sm hover:bg-gray-50"
        id="search"
      />

      <RiSearch2Line className="absolute right-3 w-6 h-6 text-gray-500" />
    </div>
  );
}
