import ConversationListHeader from "./ConversationListHeader";
import ConversationListLayout from "./ConversationListLayout";
import UserChat from "./UserChat";

export default function ConversationList() {
  return (
    <ConversationListLayout header={<ConversationListHeader />}>
      <UserChat />
      <UserChat />
      <UserChat />
    </ConversationListLayout>
  );
}
