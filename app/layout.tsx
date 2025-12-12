import type { Metadata } from 'next';
import './globals.css';
import { Vazirmatn } from 'next/font/google';
import Providers from '../components/Providers';
import LoadingOverlay from '../components/LoadingOverlay';
import PathWatcher from '../components/PathWatcher';

const vazirmatn = Vazirmatn({ subsets: ['arabic'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'کتابخانه ویدیو و پادکست',
  description: 'مرجعی ساده برای تماشای ویدیو و پادکست به زبان فارسی'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.className} antialiased`} suppressHydrationWarning>
        <Providers>
          <LoadingOverlay />
          <PathWatcher />
          {children}
        </Providers>
      </body>
    </html>
  );
}
