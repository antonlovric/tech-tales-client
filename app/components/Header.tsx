import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { exo } from '../layout';
import { getActiveUser, getIsLoggedIn, logout } from '../helpers/auth';
import ProfileIcon from './ProfileIcon';
import { prisma } from '../helpers/api';

const Header = async () => {
  const isLoggedIn = getIsLoggedIn();
  const user = getActiveUser();
  const userProfile = await prisma.users.findFirst({ where: { id: user?.id } });

  return (
    <header
      className={`${exo.className} bg-dark text-white flex items-center justify-between`}
    >
      <nav className="flex items-center">
        <div className="flex items-center gap-2">
          <Link href={'/'}>
            <Image src={'/logo.svg'} width={50} height={50} alt="Blog Logo" />
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
              <Link href={'/posts'}>Posts</Link>
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
          <Image alt="search icon" src={'/search.svg'} width={27} height={27} />
        </form>
        {isLoggedIn ? (
          <ProfileIcon logout={logout} user={userProfile} />
        ) : (
          <div className="flex items-center gap-2">
            <Link
              className="border border-slate-700 px-3 py-2 rounded-md"
              href={'/sign-in'}
            >
              <p>Sign In</p>
            </Link>
            <Link
              className="bg-slate-700 px-3 py-2 rounded-md"
              href={'/sign-up'}
            >
              <p>Sign Up</p>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
