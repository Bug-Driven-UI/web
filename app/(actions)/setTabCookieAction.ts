'use server';

import { cookies } from 'next/headers';

import { COOKIE_KEYS } from '@/src/utils/constants';

export const setTabCookieAction = async (value: string) => {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_KEYS.TAB, value);
};
