import { RiSearch2Line } from "react-icons/ri";
import { Input } from "../ui/input";

export default function SearchBar() {
  return (
    <div className="relative">
      <Input placeholder="Search..." className="pl-3 rounded-full" />
      <RiSearch2Line className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
}
