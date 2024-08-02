'use client';

import { Prisma } from '@prisma/client';
import {
  HomeIcon,
  PersonIcon,
  EnvelopeClosedIcon,
} from '@radix-ui/react-icons';
import React, { useState, useTransition } from 'react';
import { editUser } from '../actions/users';
import { useRouter } from 'next/navigation';

interface IProfileDetails {
  profile: Prisma.usersGetPayload<{
    include: {
      posts: {
        include: { post_categories: { include: { categories: true } } };
      };
    };
  }>;
}

const ProfileDetails = (props: IProfileDetails) => {
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [editedLocation, setEditedLocation] = useState(
    props.profile.location || ''
  );
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [editedPhoneNumber, setEditedPhoneNumber] = useState(
    props.profile.phone_number || ''
  );
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedEmail, setEditedEmail] = useState(props.profile.email || '');
  const [_, setTransition] = useTransition();
  const { refresh } = useRouter();

  async function handleBlur(field: string, value: string) {
    setTransition(async () => {
      try {
        if (
          field === 'location' &&
          value.trim() !== props.profile.location?.trim()
        ) {
          await editUser(props.profile.id, { location: value });
        } else if (
          field === 'phone_number' &&
          value.trim() !== props.profile.phone_number?.trim()
        ) {
          await editUser(props.profile.id, { phone_number: value });
        } else if (
          field === 'email' &&
          value.trim() !== props.profile.email?.trim()
        ) {
          await editUser(props.profile.id, { email: value });
        }
        refresh();
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <div className="flex items-center gap-3 mb-4">
      {props.profile.location ? (
        <>
          <div className="flex items-center gap-2">
            <HomeIcon />
            {isEditingLocation ? (
              <input
                onBlur={(e) => {
                  setIsEditingLocation(false);
                  handleBlur('location', e.target.value);
                }}
                className="bg-dark-gray px-2 py-2 rounded-md h-4"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
              />
            ) : (
              <p onClick={() => setIsEditingLocation(true)}>
                {props.profile.location}
              </p>
            )}
          </div>
          <div className="w-[1px] h-4 bg-white"></div>
        </>
      ) : (
        <></>
      )}
      {props.profile.phone_number ? (
        <>
          <div className="flex items-center gap-2">
            <PersonIcon />
            {isEditingPhoneNumber ? (
              <input
                onBlur={(e) => {
                  setIsEditingPhoneNumber(false);
                  handleBlur('phone_number', e.target.value);
                }}
                className="bg-dark-gray px-2 py-2 rounded-md h-4"
                value={editedPhoneNumber}
                onChange={(e) => setEditedPhoneNumber(e.target.value)}
              />
            ) : (
              <p onClick={() => setIsEditingPhoneNumber(true)}>
                {props.profile.phone_number}
              </p>
            )}
          </div>
          <div className="w-[1px] h-4 bg-white"></div>
        </>
      ) : (
        <></>
      )}
      {props.profile.email ? (
        <>
          <div className="flex items-center gap-2">
            <EnvelopeClosedIcon />
            {isEditingEmail ? (
              <input
                onBlur={(e) => {
                  setIsEditingEmail(false);
                  handleBlur('email', e.target.value);
                }}
                className="bg-dark-gray px-2 py-2 rounded-md h-4"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            ) : (
              <p onClick={() => setIsEditingEmail(true)}>
                {props.profile.email}
              </p>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileDetails;
