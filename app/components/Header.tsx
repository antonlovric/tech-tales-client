import React from 'react';
import Image from 'next/image';
import { Exo } from 'next/font/google';
import Link from 'next/link';

const exo = Exo({ subsets: ['latin'] });

const Header = () => {
  return (
    <header
      className={`${exo.className} bg-dark text-white flex items-center justify-between p-4`}
    >
      <nav className="flex items-center">
        <div className="flex items-center gap-2">
          <Image src={'logo.svg'} width={50} height={50} alt="Blog Logo" />
          <p className="font-semibold text-xl">Tech Tales</p>
        </div>
        <span className="ml-7">
          <ul className="flex items-center gap-2">
            <li>
              <Link href={'#'}>Home</Link>
            </li>
            <li>
              <Link href={'#'}>About</Link>
            </li>
            <li>
              <Link href={'#'}>Posts</Link>
            </li>
            <li>
              <Link href={'#'}>Contact</Link>
            </li>
          </ul>
        </span>
      </nav>
      <div className="flex items-center gap-5">
        <form
          action=""
          className="flex items-center gap-2 bg-dark-gray p-2 rounded-md"
        >
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="bg-transparent focus:outline-none px-2"
          />
          <Image alt="search icon" src={'search.svg'} width={27} height={27} />
        </form>
        <Image
          src={'/mock-profile.jpeg'}
          height={30}
          width={30}
          className="rounded-full object-cover h-[40px] w-[40px]"
          alt="profile image"
        ></Image>
      </div>
    </header>
  );
};

export default Header;
