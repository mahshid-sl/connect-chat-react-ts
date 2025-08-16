import { ArrowLeft, Pencil } from 'lucide-react';
import { useState } from 'react';

type ChatLayoutProps = {
  conversationList: React.ReactNode;
  chatWindow: React.ReactNode;
};

export default function ChatLayout({
  conversationList,
  chatWindow,
}: ChatLayoutProps) {
  const [activeView, setActiveView] = useState<'list' | 'chat'>('list');

  return (
    <div className="text-foreground flex h-screen">
      {/* Sidebar / Chat List */}
      <aside
        className={`w-full transition-all duration-300 md:block md:w-[400px] ${activeView === 'list' ? 'block' : 'hidden'} `}
      >
        {conversationList}
      </aside>

      {/* Main Chat Window */}
      <main
        className={`flex flex-1 flex-col ${activeView === 'chat' ? 'block' : 'hidden'} md:block`}
      >
        {/* back button */}
        <div className="p-2 md:hidden">
          <button
            onClick={() => setActiveView('list')}
            className="rounded bg-gray-200 p-1"
          >
            <ArrowLeft size={15} color="#4A5565" />
          </button>
        </div>
        {chatWindow}
      </main>

      {/* open chat button */}
      {activeView === 'list' && (
        <div className="fixed right-4 bottom-4 md:hidden">
          <button
            onClick={() => setActiveView('chat')}
            className="rounded-full bg-gray-200 p-4 text-gray-600"
          >
            <Pencil size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
