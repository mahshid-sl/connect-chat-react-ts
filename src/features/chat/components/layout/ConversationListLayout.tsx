import type { ReactNode } from 'react';

type ConversationListLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

export default function ConversationListLayout({
  header,
  children,
}: ConversationListLayoutProps) {
  return (
    <div className="flex h-full flex-col border-r bg-white">
      <header className="flex-shrink-0 p-4">{header}</header>

      <div className="flex-grow overflow-y-auto">{children}</div>
    </div>
  );
}
