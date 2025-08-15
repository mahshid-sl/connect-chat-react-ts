import { RiSearch2Line } from 'react-icons/ri';
import { Input } from '../ui/input';

export default function SearchBar() {
  return (
    <div className="relative">
      <Input placeholder="Search..." className="rounded-full pl-3" />
      <RiSearch2Line className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
    </div>
  );
}
