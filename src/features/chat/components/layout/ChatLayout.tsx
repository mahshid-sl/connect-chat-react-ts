import { ArrowLeft } from 'lucide-react';

type ChatLayoutProps = {
  conversationList: React.ReactNode;
  chatWindow: React.ReactNode;
  activeView: 'list' | 'chat';
  setActiveView: (view: 'list' | 'chat') => void;
};

export default function ChatLayout({
  conversationList,
  chatWindow,
  activeView,
  setActiveView,
}: ChatLayoutProps) {
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
    </div>
  );
}
