export type Message = {
  id: string;
  sender_id: string;
  conversation_id: string;
  text: string;
  created_at: string;
  is_read: boolean;
};

export type UserProfile = {
  id: string;
  username: string;
  name: string;
  avatar_url: string;
  bio: string;
  created_at: string;
  phone_number: string;
};

export type Conversation = {
  id: string;
  participants: string[] | null;
  last_message: string | null;
  created_at: string;
};

export type LastMessage = {
  id: string;
  text: string;
  created_at: string;
  sender_id: string;
};
