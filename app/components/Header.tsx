import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ProfileIcon from './ProfileIcon';
import { exo } from '../layout';

const Header = () => {
  return (
    <header
      className={`${exo.className} bg-dark text-white flex items-center justify-between`}
    >
      <nav className="flex items-center">
        <div className="flex items-center gap-2">
          <Link href={'/'}>
            <Image src={'logo.svg'} width={50} height={50} alt="Blog Logo" />
          </Link>
          <span className="font-semibold text-xl">Tech Tales</span>
        </div>
        <span className="ml-4">
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
          className="flex items-center gap-2 bg-dark-gray p-2 rounded-md border-2 border-transparent focus-within:border-light-gray"
        >
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="bg-transparent focus:outline-none px-2"
          />
          <Image alt="search icon" src={'search.svg'} width={27} height={27} />
        </form>
        <ProfileIcon />
      </div>
    </header>
  );
};

export default Header;
