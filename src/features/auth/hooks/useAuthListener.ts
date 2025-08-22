import supabase from '@/lib/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const useAuthListener = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Session saved on the client if previously logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Guard clause = if user not login
      if (!mounted) return;

      setSession(session ?? null);
      setLoading(false);
    });

    // Listen for changes to the user's authentication state
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setSession(session ?? null);
        setLoading(false);
      },
    );

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user: (session?.user as User) ?? null,
    loading,
  };
};

export default useAuthListener;
