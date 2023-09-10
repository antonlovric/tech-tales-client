import Image from 'next/image';
import React from 'react';

const FeaturedPost = () => {
  return (
    <article className="grid grid-cols-2 gap-x-8 w-4/6 mx-auto mt-10">
      <Image
        alt="Blog image"
        src={'/mock-blog-image.webp'}
        height={300}
        width={650}
        className="border-2 border-blog-blue rounded-md"
      />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-blog-blue px-2 py-1 rounded-md">Science</span>
            <span className="bg-blog-blue px-2 py-1 rounded-md">Computers</span>
            <span className="bg-blog-blue px-2 py-1 rounded-md">
              Programming
            </span>
          </div>
          <div>
            <h2 className="text-subheading font-semibold">
              Demystifying Quantum Computing
            </h2>
            <p className="font-light text-xl text-justify">
              Embark on an Extraordinary Journey into the Quantum Realm:
              Unveiling the Boundless Potential and Conquering the Complex
              Challenges of Quantum Computing - A Fascinating Voyage Shaping the
              Future of Technology
            </p>
          </div>
        </div>
        <div className="flex font-extralight text-lg justify-between items-center">
          <div className="flex items-center justify-between gap-2">
            <Image
              src={'/mock-profile.jpeg'}
              width={50}
              height={50}
              alt="Author profile image"
              className="rounded-full w-[40px] h-[40px] object-cover"
            />
            <p>by John Carter</p>
          </div>
          <p>31.07.2023</p>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPost;
