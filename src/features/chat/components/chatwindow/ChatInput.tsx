import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smile, Paperclip, Send } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';

type ChatInputProps = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <div className="flex-shrink-0 border-t bg-white p-4">
      <div className="flex items-center gap-4 rounded-lg bg-white p-2">
        {/* Emoji Picker */}
        {
          <Button
            onClick={() => setShowEmoji((prev) => !prev)}
            variant="ghost"
            size="icon"
          >
            <Smile className="h-6 w-6" />
          </Button>
        }

        {showEmoji && (
          <div className="absolute bottom-12 left-0 z-50">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}

        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
