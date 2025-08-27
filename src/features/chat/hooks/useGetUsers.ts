import supabase from '@/lib/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import type { UserProfile } from '../types/chat.types';

const useGetUsers = (currentUserId: string) => {
  return useQuery<UserProfile[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Profiles')
        .select('*')
        .neq('id', currentUserId);
      if (error) throw new Error('Network response was not ok');
      return data ?? [];
    },
  });
};

export default useGetUsers;
