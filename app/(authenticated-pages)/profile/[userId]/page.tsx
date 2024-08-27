import React from 'react';

import PostCard from '@/app/components/PostCard';
import Link from 'next/link';
import { customFetch, getActiveUser } from '@/app/helpers/auth';
import UserInfo from '@/app/components/Profile/UserInfo';

interface IProfilePage {
  params: { userId: string };
}

const UserProfile = async ({ params }: IProfilePage) => {
  const profileRes = await customFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.userId}`
  );
  const profile = await profileRes.json();
  const activeUser = getActiveUser();
  function getCanEdit() {
    return activeUser?.id === profile?.id;
  }
  const canEdit = getCanEdit();

  return (
    <div>
      <main className="">
        <section className="w-9/12 mx-auto mb-8">
          {profile ? (
            <UserInfo userProfile={profile} canEdit={canEdit} />
          ) : (
            <></>
          )}
        </section>
        {profile?.posts?.length ? (
          <section>
            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="whitespace-nowrap">Latest posts</p>
              <div className="w-full bg-blog-blue h-[1px]"></div>
            </div>
            <article className="grid grid-cols-auto-fill-350 autofill:250 gap-y-8 gap-x-6">
              {profile?.posts.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`}>
                  <PostCard isEditable={canEdit} post={post} />
                </Link>
              ))}
            </article>
          </section>
        ) : (
          <></>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
