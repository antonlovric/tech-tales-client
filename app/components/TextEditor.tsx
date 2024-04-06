'use client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

const TextEditor = () => {
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

  const handleSubmit = () => {};

  function toggleBold() {
    bodyEditor?.chain().focus().toggleBold().run();
  }

  return (
    <main>
      <EditorContent editor={titleEditor} className="text-4xl" />
      <hr className="mt-2 mb-6" />
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
