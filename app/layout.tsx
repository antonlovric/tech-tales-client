import './globals.css';
import type { Metadata } from 'next';
import { Exo, Inter } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });
export const exo = Exo({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tech Tales',
  description:
    'Explore the captivating stories, innovations, and adventures that define the modern tech landscape. Venture into the unknown world of emerging technologies, meet tech heroes, and decode complex concepts in this engaging tech blog. Join the adventure with Tech Tales today',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark text-white`}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <section>{children}</section>
      </body>
    </html>
  );
}
