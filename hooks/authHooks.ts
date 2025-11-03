'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

/**
 * Redirects user to a specific path if they are already logged in.
 * Use on login/register pages.
 */
export const useRedirectIfLoggedIn = (redirectPath = '/home') => {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (user?.token) {
      router.replace(redirectPath); // replace avoids adding history entry
    }
  }, [user, router, redirectPath]);
};

/**
 * Redirects user to a specific path if they are NOT logged in.
 * Use on protected pages.
 */
export const useRequireAuth = (redirectPath = '/login') => {
  const router = useRouter();
  const { user } = useUserStore();

  useEffect(() => {
    if (!user?.token) {
      router.replace(redirectPath);
    }
  }, [user, router, redirectPath]);
};
