import { Metadata } from 'next';
import FeaturedPost from '../components/FeaturedPost';
import { inter } from './layout';

export const metadata: Metadata = {
  title: 'Tech Tales | Home',
};

export default async function Home() {
  return (
    <div className={inter.className}>
      <h1 className="text-heading">
        Unlocking tech&apos;s untold stories{' '}
        <span className="text-blog-blue">one post at a time</span>
      </h1>
      <main>
        <FeaturedPost />
      </main>
    </div>
  );
}
