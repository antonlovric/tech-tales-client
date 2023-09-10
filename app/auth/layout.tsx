import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tech Tales',
  description:
    'Explore the captivating stories, innovations, and adventures that define the modern tech landscape. Venture into the unknown world of emerging technologies, meet tech heroes, and decode complex concepts in this engaging tech blog. Join the adventure with Tech Tales today',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark text-white`}>
        <section>{children}</section>
      </body>
    </html>
  );
}
