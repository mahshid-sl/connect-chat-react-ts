import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smile, Paperclip, Send } from 'lucide-react';

type ChatInputProps = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <div className="flex-shrink-0 border-t bg-white p-4">
      <div className="flex items-center gap-4 rounded-lg bg-white p-2">
        <Button variant="ghost" size="icon">
          <Smile className="h-6 w-6" />
        </Button>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="text-dark border-none bg-gray-100 placeholder:text-xs focus-visible:ring-0 focus-visible:ring-offset-0 md:placeholder:text-sm lg:placeholder:text-base"
        />
        <Button variant="ghost" size="icon">
          <Paperclip className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          className="bg-primary rounded-full"
          onClick={handleSend}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
