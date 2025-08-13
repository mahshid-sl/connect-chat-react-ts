type ChatLayoutProps = {
  conversationList: React.ReactNode;
  children: React.ReactNode;
};

export default function ChatLayout({
  conversationList,
  children,
}: ChatLayoutProps) {
  return (
    <div className=" flex h-screen text-foreground">
      <aside className="w-[320px] md:w-[400px] flex flex-col flex-shrink-0 bg-red-400 ">
        {conversationList}
      </aside>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
