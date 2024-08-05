import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { exo } from '../layout';
import {
  customFetch,
  getActiveUser,
  getIsLoggedIn,
  logout,
} from '../helpers/auth';
import ProfileIcon from './ProfileIcon';
import HeaderSearch from './HeaderSearch';

const Header = async () => {
  const isLoggedIn = getIsLoggedIn();
  const user = getActiveUser();
  const userProfileRes = await customFetch(
    `${process.env.API_URL}/users/${user?.id}`
  );
  const userProfile = await userProfileRes.json();

  console.log(isLoggedIn);

  return (
    <header
      className={`${exo.className} bg-dark text-white flex items-center justify-between`}
    >
      <nav className="flex items-center">
        <Link href={'/'} className="flex items-center gap-2">
          <Image
            src={'/tech-tales-favicon-color.png'}
            width={50}
            height={50}
            alt="Blog Logo"
          />
          <span className="font-semibold text-xl">Tech Tales</span>
        </Link>
        <span className="ml-4">
          <ul className="flex items-center gap-2">
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/posts'}>Posts</Link>
            </li>
          </ul>
        </span>
      </nav>
      <div className="flex items-center gap-5">
        <HeaderSearch />
        {userProfile?.profile_image ? (
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
