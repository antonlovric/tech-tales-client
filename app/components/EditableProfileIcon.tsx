'use client';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

interface IEditableProfileIcon {
  initialProfileIconLink: string;
  canEdit?: boolean;
  saveProfileImage: (image: string) => Promise<void>;
}

const EditableProfileIcon = ({
  initialProfileIconLink,
  canEdit,
  saveProfileImage,
}: IEditableProfileIcon) => {
  const [profileIconLink, setProfileIconLink] = useState(
    initialProfileIconLink
  );

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const image = e.target.files?.[0];
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setProfileIconLink(reader.result);
        }
      };
      reader.readAsDataURL(image);
    }
  }

  function discardChange() {
    setProfileIconLink(initialProfileIconLink);
  }

  async function saveChange() {
    await saveProfileImage(profileIconLink);
    window.location.reload();
  }

  return (
    <>
      <input
        className="hidden"
        type="file"
        name=""
        id="profile-image"
        disabled={!canEdit}
        onChange={handleImageSelect}
        accept="image/*"
      />
      <label
        htmlFor="profile-image"
        className="relative before:absolute before:w-full before:h-full before:rounded-full top-0 left-0 before:hidden before:opacity-50 before:bg-white hover:before:flex mb-2 after:absolute after:top-0 after:left-0 after:hidden"
      >
        <img
          className={`w-[150px] h-[150px] rounded-full object-cover  ${
            canEdit && 'cursor-pointer'
          } `}
          src={profileIconLink}
          alt="user profile image"
        />
        {canEdit ? (
          <>
            <button className="absolute top-0 left-0" onClick={saveChange}>
              <CheckCircledIcon className="w-[24px] h-[24px] text-green-400"></CheckCircledIcon>
            </button>
            <button className="absolute top-0 right-0" onClick={discardChange}>
              <CrossCircledIcon className="w-[24px] h-[24px] text-red-400"></CrossCircledIcon>
            </button>
          </>
        ) : (
          <></>
        )}
      </label>
    </>
  );
};

export default EditableProfileIcon;
