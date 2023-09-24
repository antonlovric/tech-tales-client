'use client';

import React from 'react';
import Image from 'next/image';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ExitIcon, FilePlusIcon, PersonIcon } from '@radix-ui/react-icons';

interface IProfileIcon {
  profileImage: string;
}

const ProfileIcon = ({ profileImage }: IProfileIcon) => {
  const handleProfileClick = () => {};
  const handleAddPost = () => {};
  const handleLogout = () => {};

  const handleSelect = (e: any) => {
    switch (e.originalTarget.attributes.itemid.value) {
      case 'profile':
        return handleProfileClick();
      case 'add-post':
        return handleAddPost();
      case 'logout':
        return handleLogout();
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Image
          src={profileImage}
          height={30}
          width={30}
          className="rounded-full object-cover h-[40px] w-[40px] cursor-pointer"
          alt="profile image"
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mr-5 mt-1 bg-dark-gray p-2 rounded-md">
          <DropdownMenu.Arrow></DropdownMenu.Arrow>
          <DropdownMenu.Item
            className="py-2 px-1 cursor-pointer"
            onSelect={handleSelect}
            itemID="profile"
          >
            <div className="flex items-center gap-2">
              <PersonIcon />
              <p>Profile</p>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="py-2 px-1 cursor-pointer"
            onSelect={handleSelect}
            itemID="add-post"
          >
            <div className="flex items-center gap-2">
              <FilePlusIcon />
              <p>Add Post</p>
            </div>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="py-2 px-1 cursor-pointer"
            onSelect={handleSelect}
            itemID="logout"
          >
            <div className="flex items-center gap-2">
              <ExitIcon />
              <p>Log out</p>
            </div>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default ProfileIcon;
