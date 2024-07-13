import { Metadata } from 'next';
import FeaturedPost from '../components/FeaturedPost';
import { inter } from './layout';
import { getRelevantPostId, updateRelevanceScores } from '../helpers/analytics';
import { prisma } from '../helpers/api';

export const metadata: Metadata = {
  title: 'Tech Tales | Home',
};

export default async function Home() {
  updateRelevanceScores();
  const relevantPostId = await getRelevantPostId();

  const relevantPost = await prisma.posts.findFirst({
    where: {
      id: {
        equals: relevantPostId,
      },
    },
    include: {
      author: true,
      post_categories: {
        include: {
          categories: true,
        },
      },
    },
  });

  return (
    <div className={inter.className}>
      <h1 className="text-heading">
        Unlocking tech&apos;s untold stories{' '}
        <span className="text-blog-blue">one post at a time</span>
      </h1>
      <main>{relevantPost ? <FeaturedPost post={relevantPost} /> : <></>}</main>
    </div>
  );
}
