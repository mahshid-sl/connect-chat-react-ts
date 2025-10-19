// hooks/useConversationSettings.ts
import supabase from '@/lib/supabaseClient';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ConversationSetting = {
  id: string;
  wallpaper_url: string;
  mute: boolean;
  blocked: boolean;
  deleted: boolean;
  updated_at: string;
};

export const fetchConversationSetting = async (
  conversationId: string,
  userId: string,
) => {
  const { data, error } = await supabase
    .from('Conversation_settings')
    .select('*')
    .eq('conversation_id', conversationId)
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 یعنی ردیف پیدا نشده، OK هست
  return data || null;
};

export const updateOrCreateConversationSetting = async (
  conversationId: string,
  userId: string,
  settings: Partial<ConversationSetting>,
) => {
  const { data, error } = await supabase
    .from('Conversation_settings')
    .upsert({
      user_id: userId,
      conversation_id: conversationId,
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

const useConversationSettings = (
  conversationId: string,
  currentUserId: string,
) => {
  const queryClient = useQueryClient();

  const {
    data: setting,
    isLoading,
    error,
  } = useQuery<ConversationSetting | null>({
    queryKey: ['conversationSettings', conversationId, currentUserId],
    queryFn: () => fetchConversationSetting(conversationId, currentUserId),
    enabled: !!conversationId && !!currentUserId,
  });

  const updateSettingMutation = useMutation({
    mutationFn: (newSettings: Partial<ConversationSetting>) =>
      updateOrCreateConversationSetting(
        conversationId,
        currentUserId,
        newSettings,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['conversationSettings', conversationId, currentUserId],
      });
    },
  });

  return {
    setting,
    isLoading,
    error,
    updateSetting: updateSettingMutation.mutate,
  };
};

export default useConversationSettings;
