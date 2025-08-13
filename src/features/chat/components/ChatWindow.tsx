import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessageList from "./ChatMessageList";

import defaultChatPattern from "../assets/defaultChatPattern.webp";

export default function ChatWindow() {
  return (
    <div className="relative flex flex-col w-full h-full">
      {/* ====wallpaper=== */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-repeat"
        style={{ backgroundImage: `url(${defaultChatPattern})` }}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/5" />

      {/* ============== */}

      <div className="relative z-10 flex flex-col h-full w-full">
        <ChatHeader />

        <div className="flex-grow overflow-y-auto">
          <ChatMessageList />
        </div>

        <ChatInput />
      </div>
    </div>
  );
}
