import { prisma } from '@/app/helpers/api';
import React from 'react';
import {
  EnvelopeClosedIcon,
  HomeIcon,
  PersonIcon,
} from '@radix-ui/react-icons';
import PostCard from '@/app/components/PostCard';
import Link from 'next/link';

interface IProfilePage {
  params: { userId: string };
}

const UserProfile = async ({ params }: IProfilePage) => {
  const profile = await prisma.users.findFirst({
    where: { id: { equals: parseInt(params.userId || '') } },
    include: {
      posts: {
        include: { post_categories: { include: { categories: true } } },
      },
    },
  });

  const profileImageSrc = profile?.profile_image || '/blank_profile_image.svg';

  return (
    <div>
      <main className="">
        <section className="w-9/12 flex flex-col justify-center items-center mx-auto mb-8">
          <img
            className="w-[150px] h-[150px] rounded-full object-cover mb-2"
            src={profileImageSrc}
            alt="user profile image"
          />
          <p className="mb-4">
            {profile?.first_name} {profile?.last_name}
          </p>
          <div className="flex items-center gap-3 mb-4">
            {profile?.location ? (
              <>
                <div className="flex items-center gap-2">
                  <HomeIcon />
                  <p>{profile.location}</p>
                </div>
                <div className="w-[1px] h-4 bg-white"></div>
              </>
            ) : (
              <></>
            )}
            {profile?.phone_number ? (
              <>
                <div className="flex items-center gap-2">
                  <PersonIcon />
                  <p>{profile.phone_number}</p>
                </div>
                <div className="w-[1px] h-4 bg-white"></div>
              </>
            ) : (
              <></>
            )}
            {profile?.email ? (
              <>
                <div className="flex items-center gap-2">
                  <EnvelopeClosedIcon />
                  <p>{profile.email}</p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
          {profile?.bio ? (
            <div className="flex flex-col gap-2">
              <p>About me:</p>
              <p>{profile?.bio}</p>
            </div>
          ) : (
            <></>
          )}
        </section>
        <section>
          <p className="mb-3">Latest posts</p>
          <article className="grid grid-cols-3 gap-2">
            {profile?.posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </article>
        </section>
      </main>
    </div>
  );
};

export default UserProfile;
