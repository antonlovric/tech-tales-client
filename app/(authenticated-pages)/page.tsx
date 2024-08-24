import { Metadata } from 'next';
import FeaturedPost from '../components/FeaturedPost';
import { getSanitizedHtml } from '../helpers/global';
import Link from 'next/link';
import { customFetch } from '../helpers/auth';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tech Tales | Home',
};

export default async function Home() {
  const postsByCategoryRes = await customFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/categories`,
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
      <main>
        <FeaturedPost />
      </main>
      {filteredPostCategories.map((category) => (
        <section className="flex flex-col gap-2 mt-6 pb-4" key={category.id}>
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center justify-between gap-6 w-full">
              <p className="whitespace-nowrap">Latest {category.name} news</p>
              <div className="h-[1px] bg-blog-blue w-full"></div>
            </div>
            <Link href={`/posts?categories=[${category.id}]`}>
              <button className="button-primary">More</button>
            </Link>
          </div>
          <div className="grid md:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-y-8 gap-x-6 overflow-x-scroll mt-2">
            {category.post_categories.map((post) => (
              <Link
                href={`post/${post.posts.id}`}
                className="bg-dark-gray rounded-md p-2 cursor-pointer h-full flex flex-col justify-between relative"
                key={`${post.categories.id}-${post.posts.id}`}
              >
                <Image
                  src={post.posts.cover_image || ''}
                  alt=""
                  className="block rounded-md h-[250px] w-full object-cover"
                  height={350}
                  width={600}
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
