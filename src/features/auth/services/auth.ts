import supabase from '@/lib/supabaseClient';
import type { AuthCredentials } from '../types/auth.types';

//========Sign Up========
export const signUp = async ({
  username,
  email,
  password,
}: AuthCredentials) => {
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      },
    },
  });

  if (signUpError) {
    console.error('Error signing up:', signUpError.message);
    return { data, error: signUpError };
  }
  // get current user after sign up
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('Current user after sign up:', user);
  if (!user?.id) {
    console.error('User not found after sign up');
    return { data, error: new Error('User not found') };
  }
  // check if profile exists
  const { data: existingProfiles, error: selectError } = await supabase
    .from('Profiles')
    .select('id')
    .eq('id', user.id);

  if (selectError) {
    console.error('Error checking existing profile:', selectError.message);
    return { data, error: selectError };
  }

  // insert profile if not exists
  if (!existingProfiles || existingProfiles.length === 0) {
    const { error: profileError } = await supabase
      .from('Profiles')
      .insert({ id: user.id, name: user.email?.split('@')[0], username });

    if (profileError) {
      console.error('Error inserting profile:', profileError.message);
      return { data, error: profileError };
    }
  } else {
    console.log('Profile already exists, skipping insert');
  }

  console.log('Sign up and profile creation successful');
  return { data, error: null };
};

// ========Sign In========
export const signIn = async ({ email, password }: AuthCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

// ========Sign Out========

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// ========Reset password========

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  return { data, error };
};
