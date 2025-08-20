import supabase from '@/lib/supabaseClient';
import type { AuthCredentials } from '../types/auth.types';

//========Sign Up========
export const signUp = async ({
  username,
  email,
  password,
}: AuthCredentials) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  return { data, error };
};

// ========Sign In========
export const signIn = async ({ email, password }: AuthCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};
