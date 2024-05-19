'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useRef, useState } from 'react';
import type { categories } from '@prisma/client';
import { ICreatePostRequest } from '../(authenticated-pages)/create-post/page';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CharacterCount from '@tiptap/extension-character-count';

interface ITextEditor {
  categories?: categories[];
  createPost: (args: ICreatePostRequest) => Promise<void>;
  uploadCoverImage: (image: string) => Promise<string | undefined>;
}

const TextEditor = ({
  categories,
  createPost,
  uploadCoverImage,
}: ITextEditor) => {
  const [coverImage, setCoverImage] = useState('');
  const name = useRef('');
  const router = useRouter();
  const titleEditor = useEditor({
    extensions: [StarterKit, CharacterCount.configure({ limit: 100 })],
    content: '<h1>This is the title of your article!</h1>',
    injectCSS: false,
  });

  const summaryEditor = useEditor({
    extensions: [StarterKit, CharacterCount.configure({ limit: 300 })],
    content: '<h2>Write a quick summary!</h2>',
    injectCSS: false,
  });

  const bodyEditor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    injectCSS: false,
  });

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleSubmit = async () => {
    const coverImagePath = await uploadCoverImage(coverImage);

    await createPost({
      categoryIds: selectedCategories,
      html_content: bodyEditor?.getHTML() || '',
      json_content: bodyEditor?.getJSON() || { type: '', content: [] },
      summary: summaryEditor?.getHTML() || '',
      title: titleEditor?.getHTML() || '',
      coverImagePath,
    });
    router.replace('/');
  };

  function selectCategory(id: number) {
    const updatedCategories = selectedCategories.concat([id]);
    setSelectedCategories(updatedCategories);
  }

  function removeCategory(targetId: number) {
    setSelectedCategories(selectedCategories.filter((id) => id !== targetId));
  }

  function toggleCategory(id: number) {
    if (getIsCategorySelected(id)) {
      removeCategory(id);
    } else selectCategory(id);
  }

  function getIsCategorySelected(targetIid: number) {
    return !!selectedCategories.find((id) => id === targetIid);
  }

  function toggleBold() {
    bodyEditor?.chain().focus().toggleBold().run();
  }

  async function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const image = e.target.files?.[0];
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(image);
    }
  }

  async function handleRemoveImages() {
    if (name.current) {
      console.log('removing image');
      console.log(name.current);
      try {
        // await deleteImage(name.current);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleRemoveImages);
    return () => {
      window.removeEventListener('beforeunload', handleRemoveImages);
      handleRemoveImages();
    };
  }, []);

  return (
    <main>
      <EditorContent editor={titleEditor} className="text-4xl" />

      <hr className="mt-2 mb-6" />
      <div className="flex justify-end items-center gap-2">
        {categories?.map((category) => (
          <div
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`${
              !getIsCategorySelected(category.id)
                ? 'bg-none border-blog-blue border'
                : 'bg-blog-blue border border-transparent'
            }  flex items-center justify-center px-2 py-1 rounded-md text-xs cursor-pointer`}
          >
            {category.name}
          </div>
        ))}
      </div>
      {coverImage ? (
        <div className="w-full flex justify-center relative py-5">
          <Image
            src={coverImage}
            alt=""
            width={100}
            height={200}
            className="w-[400px] rounded-md"
          />
        </div>
      ) : (
        <div>
          <label className="pointer" htmlFor="cover-image">
            Upload cover image
          </label>
          <input
            className="hidden"
            type="file"
            name="cover-image"
            id="cover-image"
            onChange={handleImageSelect}
          />
        </div>
      )}

      <EditorContent editor={summaryEditor} className="text-4xl" />
      <div className="flex items-center gap-2">
        <button onClick={toggleBold}>Bold</button>
      </div>
      <EditorContent editor={bodyEditor} className="text-md leading-6" />
      <div className="mt-5">
        <button onClick={handleSubmit} className="button-primary">
          Submit
        </button>
      </div>
    </main>
  );
};

export default TextEditor;
