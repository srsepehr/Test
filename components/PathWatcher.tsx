'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAppContext } from './Providers';

export default function PathWatcher() {
  const pathname = usePathname();
  const { setLoading } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [pathname, setLoading]);

  return null;
}
