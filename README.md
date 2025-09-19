# 💬 Chat App

A real-time one-on-one chat application built with **React**, **TypeScript**, **Supabase** and **React Query**.  
This repo is a small demo for learning — focuses on realtime messaging, user profiles and file uploads.

---
## 🎥 Demo
[watch in Loom]<div>
    <a href="https://www.loom.com/share/06b9c14540b94b48beb27c5190fe1259">
      <p>Connect - 19 September 2025 - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/06b9c14540b94b48beb27c5190fe1259">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/06b9c14540b94b48beb27c5190fe1259-777a7cb15c8aef36-full-play.gif">
    </a>
  </div>


## 🚀 Features

- 🔐 Authentication with Supabase
- 💬 One-on-one conversations
- 📩 Send & receive messages in real time (Supabase Realtime)
- 👤 User profile (avatar upload, name, username, bio, phone)
- ⚡ Optimistic updates / cache management with React Query
- 🎨 Styled with Tailwind CSS and shadcn

> ⚠️ Note: there is an `is_read` field in the database (for message read tracking) but the UI badge/count feature is currently disabled (has a bug). You can enable/finish that later.

---

## 🛠 Tech Stack

- React (Vite)
- TypeScript
- Supabase (Postgres + Auth + Realtime + Storage)
- React Query (TanStack Query)
- Redux toolkit
- React hook form
- zod
- Framer Motion
- Tailwind CSS
- ShadCN
- Date fns

## 📂 Project Structure

```bash
src/
  ├── components/        # UI components (ChatWindow, ConversationList, etc.)
  ├── hooks/             # Custom hooks (useSendMessage, useGetMessages, etc.)
  ├── lib/               # Supabase client
  ├── types/             # TypeScript types
  └── pages/             # App pages

⚙️ Installation
1.Clone the repo:
git clone https://github.com/mahshid-sl/connect-chat-react-ts.git
cd connect-chat-react-ts

2.Install dependencies:
npm install

3.Add your Supabase keys:
Create .env.local and add:
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

4.Start the dev server:
npm run dev

## 🗄️ Database Schema
=========
Profiles
=========
create table public."Profiles" (
  created_at timestamp with time zone not null default now(),
  username text null,
  name text null,
  bio text null,
  avatar_url text null,
  phone_number text null,
  id uuid not null default auth.uid (),
  constraint Profiles_pkey primary key (id),
  constraint Profile_user_name_key unique (username)
) TABLESPACE pg_default;

=========
Messages
=========
create table public."Messages" (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  conversation_id uuid null,
  sender_id uuid null,
  text text null default ''::text,
  is_read boolean null default false,
  receiver_id uuid null,
  constraint Messages_pkey primary key (id),
  constraint Messages_conversation_id_fkey foreign KEY (conversation_id) references "Conversations" (id),
  constraint Messages_receiver_id_fkey foreign KEY (receiver_id) references "Profiles" (id),
  constraint Messages_sender_id_fkey foreign KEY (sender_id) references "Profiles" (id)
) TABLESPACE pg_default;

==============
Conversations
==============

create table public."Conversations" (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  participants uuid[] null,
  last_message text null default ''::text,
  constraint Conversations_pkey primary key (id)
) TABLESPACE pg_default;





