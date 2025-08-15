import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function UserProfile() {
  return (
    <div className="grid w-full max-w-sm items-center gap-3 p-3">
      <Label htmlFor="bio">bio</Label>
      <Input
        className="border-none"
        type="text"
        id="bio"
        placeholder="Add a few words about yourself"
      />
    </div>
  );
}
