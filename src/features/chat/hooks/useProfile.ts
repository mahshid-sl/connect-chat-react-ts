import supabase from '@/lib/supabaseClient';
import type { UserProfile } from '../types/chat.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/features/auth/services/auth';

// 1. Fetch user profile
export const fetchProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from('Profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;

  return data;
};

// 2. Update user profile
export const updateProfile = async (
  userId: string,
  profileData: Partial<UserProfile>,
) => {
  const { data, error } = await supabase
    .from('Profiles')
    .update(profileData)
    .eq('id', userId)
    .single();

  if (error) throw error;

  return data;
};

// 3. Delete user data (local data, optional since Edge Function does it)
export const deleteUserData = async (userId: string) => {
  const { error } = await supabase.from('Profiles').delete().eq('id', userId);

  if (error) throw error;

  await supabase
    .from('Messages')
    .delete()
    .eq('sender_id', userId)
    .or(`receiver_id.eq.${userId}`);
  await supabase.from('Conversations').delete().eq('participants', userId);

  return { success: true };
};

// 4. Delete user from auth (via Edge Function with auth)
export const deleteUserFromAuth = async (userId: string) => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const {
    data: { session },
  } = await supabase.auth.getSession(); // get current session

  const response = await fetch(`${supabaseUrl}/functions/v1/delete-user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token}`, // send JWT token
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete user from auth');
  }

  return response.json();
};

const useProfile = (currentUserId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<UserProfile | null>({
    queryKey: ['profile', currentUserId],
    queryFn: () => fetchProfile(currentUserId),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (profileData: Partial<UserProfile>) =>
      updateProfile(currentUserId, profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', currentUserId] });
    },
  });

  const deleteProfileMutation = useMutation({
    mutationFn: async () => {
      // await deleteUserData(currentUserId);
      await deleteUserFromAuth(currentUserId); // call Edge Function
    },
    onSuccess: async () => {
      await signOut();
      queryClient.clear();
      navigate('/');
    },
    onError: (error) => {
      console.error('Delete user failed:', error);
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile: updateProfileMutation.mutate,
    deleteProfile: deleteProfileMutation.mutate,
  };
};

export default useProfile;
