type ChatLayoutProps = {
  conversationList: React.ReactNode;
  children: React.ReactNode;
};

export default function ChatLayout({
  conversationList,
  children,
}: ChatLayoutProps) {
  return (
    <div className="text-foreground flex h-screen">
      <aside className="flex w-[320px] flex-shrink-0 flex-col bg-red-400 md:w-[400px]">
        {conversationList}
      </aside>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
