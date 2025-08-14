import type { ReactNode } from "react";

type ConversationListLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

export default function ConversationListLayout({
  header,
  children,
}: ConversationListLayoutProps) {
  return (
    <div className="flex flex-col h-full bg-white border-r">
      <header className="p-4 flex-shrink-0">{header}</header>

      <div className="flex-grow overflow-y-auto">{children}</div>
    </div>
  );
}
