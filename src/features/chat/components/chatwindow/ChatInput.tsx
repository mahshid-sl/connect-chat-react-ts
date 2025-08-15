import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smile, Paperclip, Send } from 'lucide-react';

export default function ChatInput() {
  return (
    <div className="flex-shrink-0 border-t border-white bg-white p-4">
      <div className="flex items-center gap-4 rounded-lg bg-white p-2">
        <Button variant="ghost" size="icon">
          <Smile className="h-6 w-6" />
        </Button>
        <Input
          type="text"
          placeholder="Type a message..."
          className="text-dark border-none bg-gray-100 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button variant="ghost" size="icon">
          <Paperclip className="h-6 w-6" />
        </Button>
        <Button size="icon" className="bg-primary rounded-full">
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
