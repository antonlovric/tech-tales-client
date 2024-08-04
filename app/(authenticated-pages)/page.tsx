import { Metadata } from 'next';
import FeaturedPost from '../components/FeaturedPost';
import { inter } from './layout';
import { getSanitizedHtml } from '../helpers/global';
import Link from 'next/link';
import { customFetch } from '../helpers/auth';

export const metadata: Metadata = {
  title: 'Tech Tales | Home',
};

export default async function Home() {
  const relevantPostRes = await customFetch(
    `${process.env.API_URL}/analytics/relevant_post`,
    {
      method: 'GET',
    }
  );
  const relevantPost = await relevantPostRes.json();

  const postsByCategoryRes = await customFetch(
    `${process.env.API_URL}/posts/categories`,
    {
      method: 'GET',
    }
  );
  const postsByCategory = await postsByCategoryRes.json();

  const filteredPostCategories = postsByCategory.filter(
    (category) => category.post_categories.length
  );

  return (
    <div className={inter.className}>
      <h1 className="text-heading">
        Unlocking tech&apos;s untold stories
        <span className="text-blog-blue"> one post at a time</span>
      </h1>
      <main>{relevantPost ? <FeaturedPost post={relevantPost} /> : <></>}</main>
      {filteredPostCategories.map((category) => (
        <section
          className="flex flex-col gap-2 mt-6 [&:not(:last-child)]:border-b-4 border-blog-blue pb-4"
          key={category.id}
        >
          <div className="flex items-center justify-between">
            <p>Latest {category.name} news</p>
            <Link href={`/posts?categories=[${category.id}]`}>
              <button className="button-primary">More</button>
            </Link>
          </div>
          <div className="flex items-start gap-8 w-full overflow-x-scroll">
            {category.post_categories.map((post) => (
              <Link
                href={`post/${post.posts_id}`}
                className="bg-dark-gray rounded-md p-2 cursor-pointer relative max-w-[350px]"
                key={`${post.categories_id}-${post.posts_id}`}
              >
                <img
                  src={post.posts.cover_image || ''}
                  alt=""
                  className=" h-[250px] w-full object-cover"
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html: getSanitizedHtml(post.posts.title),
                  }}
                ></span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: getSanitizedHtml(post.posts.summary),
                  }}
                ></span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
