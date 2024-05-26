'use client';
import { users } from '@prisma/client';
import {
  CheckCircledIcon,
  CrossCircledIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons';
import CharacterCount from '@tiptap/extension-character-count';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useState } from 'react';
interface IProfileBioEditor {
  user: users;
  updateUserBio: (bio: string) => Promise<void>;
}
const ProfileBioEditor = ({ user, updateUserBio }: IProfileBioEditor) => {
  const [isEditing, setIsEditing] = useState(false);

  const bioEditor = useEditor({
    extensions: [StarterKit, CharacterCount.configure({ limit: 550 })],
    content: user.bio || '',
    injectCSS: false,
    autofocus: true,
    onBlur: stopEditing,
  });

  function startEditing() {
    setIsEditing(true);
  }

  function stopEditing() {
    setIsEditing(false);
  }

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  async function saveBio() {
    await updateUserBio(bioEditor?.getText() || '');
    window.location.reload();
  }

  function discardBio() {
    stopEditing();
    bioEditor?.commands.setContent(user.bio);
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between">
        <p>About me:</p>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button onClick={saveBio}>
              <CheckCircledIcon className="text-green-400 w-[24px] h-[24px]"></CheckCircledIcon>
            </button>
            <button onClick={discardBio}>
              <CrossCircledIcon className="text-red-400 w-[24px] h-[24px]"></CrossCircledIcon>
            </button>
          </div>
        ) : (
          <>
            <button onClick={toggleEdit}>
              <Pencil1Icon className="h-[24px] w-[24px]"></Pencil1Icon>
            </button>
          </>
        )}
      </div>
      {isEditing ? (
        <EditorContent
          editor={bioEditor}
          className="bg-dark-gray px-2 py-2 rounded-md"
        />
      ) : (
        <p>{user?.bio}</p>
      )}
    </div>
  );
};

export default ProfileBioEditor;
