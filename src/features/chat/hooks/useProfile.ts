import supabase from '@/lib/supabaseClient';

import type { UserProfile } from '../types/chat.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

// 3. Delete user profile
export const deleteProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('Profiles')
    .delete()
    .eq('id', userId)
    .single();

  if (error) throw error;

  return data;
};

const useProfile = (currentUserId: string) => {
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery<UserProfile | null>({
    queryKey: ['profile', currentUserId],
    queryFn: () => fetchProfile(currentUserId),
  });

  const mutation = useMutation({
    mutationFn: (profileData: Partial<UserProfile>) =>
      updateProfile(currentUserId, profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', currentUserId] });
    },
  });

  return { profile, isLoading, error, updateProfile: mutation.mutate };
};

export default useProfile;
