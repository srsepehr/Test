'use client';

import { useAppContext } from './Providers';

export default function LoadingOverlay() {
  const { loading } = useAppContext();
  return (
    <div
      className={`fixed inset-0 pointer-events-none transition-opacity duration-300 ${
        loading ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden={!loading}
    >
      <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm ${loading ? '' : 'hidden'}`}></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl bg-white/90 px-5 py-4 shadow-xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          <div className="h-10 w-10 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin"></div>
          <div className="text-slate-700 dark:text-slate-100 font-semibold">Loading...</div>
        </div>
      </div>
    </div>
  );
}
