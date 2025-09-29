import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smile, Paperclip, Send } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import type { EmojiClickData } from 'emoji-picker-react';
import { catEmojis } from '@/data/catEmoji';

type ChatInputProps = {
  onSend: (message: string) => void;
};

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    const cat = catEmojis.find((c) => c.names.includes(emojiObject.names[0]));

    setMessage((prev) => prev + (cat ? cat.names[0] : emojiObject.emoji));
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage('');
  };

  return (
    <div className="flex-shrink-0 border-t bg-white p-4 dark:bg-gray-900 dark:text-white">
      <div className="flex items-center gap-4 rounded-lg bg-white p-2 dark:bg-gray-900 dark:text-white">
        {/* Emoji Button */}
        {
          <Button
            type="button"
            onClick={() => setShowEmoji((prev) => !prev)}
            variant="ghost"
            size="icon"
          >
            <Smile className="h-6 w-6" />
          </Button>
        }

        {showEmoji && (
          <div className="absolute bottom-15 left-0 z-50">
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              customEmojis={catEmojis}
              lazyLoadEmojis
              previewConfig={{ showPreview: false }}
              searchDisabled={false}
            />
          </div>
        )}

        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          className="text-dark border-none bg-gray-100 placeholder:text-xs focus-visible:ring-0 focus-visible:ring-offset-0 md:placeholder:text-sm lg:placeholder:text-base dark:text-white"
        />
        <Button type="button" variant="ghost" size="icon">
          <Paperclip className="h-6 w-6" />
        </Button>
        <Button
          type="button"
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
