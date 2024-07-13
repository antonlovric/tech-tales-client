import { Metadata } from 'next';
import FeaturedPost from '../components/FeaturedPost';
import { inter } from './layout';
import { updateRelevanceScores } from '../helpers/analytics';
import { redisClient } from '../lib/redis';

export const metadata: Metadata = {
  title: 'Tech Tales | Home',
};

export default async function Home() {
  await updateRelevanceScores();
  const relevancePostIds = await redisClient.zRangeByScore(
    'post_relevance_scores',
    0,
    1
  );

  if (relevancePostIds.length) {
    console.log('RELEVANT POST ID');
    console.log(relevancePostIds[0]);
  }

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
