import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList';

import defaultChatPattern from '../../../chat/assets/defaultChatPattern.webp';

export default function ChatWindow() {
  return (
    <div className="relative flex h-full w-full flex-col">
      {/* ====wallpaper=== */}
      <div
        className="absolute top-0 left-0 h-full w-full bg-repeat"
        style={{ backgroundImage: `url(${defaultChatPattern})` }}
      />
      <div className="absolute top-0 left-0 h-full w-full bg-black/5" />

      {/* ============== */}

      <div className="relative z-10 flex h-full w-full flex-col">
        <ChatHeader />

        <div className="flex-grow overflow-y-auto">
          <ChatMessageList />
        </div>

        <ChatInput />
      </div>
    </div>
  );
}
