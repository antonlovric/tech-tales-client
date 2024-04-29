'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useState } from 'react';
import type { categories } from '@prisma/client';
import { ICreatePostRequest } from '../(authenticated-pages)/create-post/page';

interface ITextEditor {
  categories?: categories[];
  createPost: (args: ICreatePostRequest) => void;
}

const TextEditor = ({ categories, createPost }: ITextEditor) => {
  const titleEditor = useEditor({
    extensions: [StarterKit],
    content: '<h1>This is the title of your article!</h1>',
    injectCSS: false,
  });
  const bodyEditor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    injectCSS: false,
  });
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleSubmit = () => {
    createPost({
      categoryIds: selectedCategories,
      html_content: bodyEditor?.getHTML() || '',
      json_content: bodyEditor?.getJSON() || { type: '', content: [] },
      summary: '',
      title: titleEditor?.getHTML() || '',
    });
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
      <div className="flex items-center gap-2">
        <button onClick={toggleBold}>Bold</button>
      </div>
      <EditorContent editor={bodyEditor} className="text-xl" />
      <div className="mt-5">
        <button onClick={handleSubmit} className="button-primary">
          Submit
        </button>
      </div>
    </main>
  );
};

export default TextEditor;
