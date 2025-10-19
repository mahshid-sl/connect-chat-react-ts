// import supabase from '@/lib/supabaseClient';
// import { useEffect } from 'react';

// function useOnlineStatus(userId: string | undefined) {
//   useEffect(() => {
//     if (!userId) return;

//     // when user logins, set is_online to true
//     const setOnline = async () => {
//       await supabase
//         .from('Profiles')
//         .update({ is_online: true })
//         .eq('id', userId);
//     };
//     // when user logouts, set is_online to false
//     const setOffline = async () => {
//       await supabase
//         .from('Profiles')
//         .update({ is_online: false, last_seen: new Date().toISOString() })
//         .eq('id', userId);
//     };

//     setOnline();
//     window.addEventListener('beforeunload', setOffline);

//     return () => {
//       setOffline();
//       window.removeEventListener('beforeunload', setOffline);
//     };
//   }, [userId]);
// }

// export default useOnlineStatus;
// import { useEffect } from 'react';
// import supabase from '@/lib/supabaseClient';

// export default function useOnlineStatus(userId?: string) {
//   useEffect(() => {
//     console.log('🔹 currentUserId:', userId);

//     if (!userId) return;

//     const updateStatus = async (isOnline: boolean) => {
//       await supabase
//         .from('Profiles')
//         .update({
//           is_online: isOnline,
//           last_seen: isOnline ? null : new Date().toISOString(),
//         })
//         .eq('id', userId);
//     };

//     const setOfflineBeacon = () => {
//       const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/Profiles?id=eq.${userId}`;
//       const body = JSON.stringify({
//         is_online: false,
//         last_seen: new Date().toISOString(),
//       });

//       navigator.sendBeacon(url, body);
//     };

//     // وقتی تب باز است → آنلاین شو
//     updateStatus(true);

//     window.addEventListener('beforeunload', setOfflineBeacon);

//     return () => {
//       updateStatus(false);
//       window.removeEventListener('beforeunload', setOfflineBeacon);
//     };
//   }, [userId]);
// }
import { useEffect } from 'react';
import supabase from '@/lib/supabaseClient';

export default function useOnlineStatus(userId?: string) {
  const getUserStatus = async () => {
    const { data: authData } = await supabase.auth.getUser();
    console.log('👤 auth.uid:', authData.user?.id);
    console.log('👤 userId from prop:', userId);
  };
  getUserStatus();
  useEffect(() => {
    if (!userId) return;

    const updateStatus = async (isOnline: boolean) => {
      const { error } = await supabase
        .from('Profiles')
        .update({
          is_online: isOnline,
          last_seen: isOnline ? null : new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) console.error('⚠️ Error updating status:', error.message);
      else console.log('✅ Updated status:', isOnline ? 'Online' : 'Offline');
    };

    // کاربر آنلاین شد
    updateStatus(true);

    // بستن تب → آفلاین شو
    const handleBeforeUnload = () => updateStatus(false);

    // وقتی logout می‌کنه
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'supabase.auth.token' && !e.newValue) {
        updateStatus(false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('storage', handleStorage);

    return () => {
      updateStatus(false);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('storage', handleStorage);
    };
  }, [userId]);
}
