'use client';

import { Editor, EditorContent } from '@tiptap/react';
import React, { useState } from 'react';
import TextEditorButton from './TextEditorButton';
import ActionDropdown from '../UI/ActionDropdown';
import { uploadImage } from '@/app/helpers/s3';

interface IBodyEditor {
  editor: Editor | null;
  deleteImages?: (imageIds: string[]) => Promise<void>;
  updateUploadedImagesList?: (imageKey: string) => void;
}

const BodyEditor = (props: IBodyEditor) => {
  const [isFontDropdownVisible, setIsFontDropdownVisible] = useState(false);
  const [activeFontType, setActiveFontType] = useState('Paragraph');

  function toggleBold() {
    props.editor?.chain().focus().toggleBold().run();
  }

  function toggleItalic() {
    props.editor?.chain().focus().toggleItalic().run();
  }

  function toggleStrikethrough() {
    props.editor?.chain().focus().toggleStrike().run();
  }

  function handleFontTypeChange(
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    const fontType = e.currentTarget.getAttribute('data-font-type');
    if (fontType === 'h1') {
      props.editor?.chain().focus().toggleHeading({ level: 1 }).run();
      setActiveFontType('Heading 1');
    } else if (fontType === 'h2') {
      props.editor?.chain().focus().toggleHeading({ level: 2 }).run();
      setActiveFontType('Heading 2');
    } else if (fontType === 'h3') {
      props.editor?.chain().focus().toggleHeading({ level: 3 }).run();
      setActiveFontType('Heading 3');
    } else if (fontType === 'p') {
      props.editor?.chain().focus().setParagraph().run();
      setActiveFontType('Paragraph');
    }
    setIsFontDropdownVisible(false);
  }

  function toggleBulletList() {
    props.editor?.chain().focus().toggleBulletList().run();
  }

  function toggleOrderedList() {
    props.editor?.chain().focus().toggleOrderedList().run();
  }

  function toggleCodeBlock() {
    props.editor?.chain().focus().toggleCodeBlock().run();
  }

  async function insertImage(e: React.ChangeEvent<HTMLInputElement>) {
    const image = e.target.files?.[0];
    if (image) {
      const url = await uploadImage(image);
      if (url) {
        props.editor
          ?.chain()
          .insertContentAt(props.editor.state.selection.anchor, {
            type: 'image',
            attrs: { src: url, alt: 'Article image', title: 'Article image' },
          })
          .focus()
          .run();
        const splitImageUrl = url.split('/');
        if (props.updateUploadedImagesList)
          props.updateUploadedImagesList(
            splitImageUrl[splitImageUrl.length - 1]
          );
      }
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsFontDropdownVisible(!isFontDropdownVisible)}
          className="relative"
        >
          <span>{activeFontType}</span>
          <ActionDropdown isVisible={isFontDropdownVisible}>
            <span data-font-type="h1" onClick={handleFontTypeChange}>
              Heading 1
            </span>
            <span data-font-type="h2" onClick={handleFontTypeChange}>
              Heading 2
            </span>
            <span data-font-type="h3" onClick={handleFontTypeChange}>
              Heading 3
            </span>
            <span data-font-type="p" onClick={handleFontTypeChange}>
              Paragraph
            </span>
          </ActionDropdown>
        </button>
        <div className="flex items-center gap-2 pr-2 border-r border-r-white border-solid">
          <TextEditorButton
            onClick={toggleBold}
            isActive={props.editor?.isActive('bold')}
            iconName="format_bold"
          />
          <TextEditorButton
            onClick={toggleItalic}
            isActive={props.editor?.isActive('italic')}
            iconName="format_italic"
          />
          <TextEditorButton
            onClick={toggleStrikethrough}
            isActive={props.editor?.isActive('strike')}
            iconName="strikethrough_s"
          />
        </div>
        <div className="flex items-center gap-4 pr-2 border-r border-r-white border-solid">
          <TextEditorButton
            onClick={toggleBulletList}
            isActive={props.editor?.isActive('bulletList')}
            iconName="format_list_bulleted"
          />
          <TextEditorButton
            onClick={toggleOrderedList}
            isActive={props.editor?.isActive('orderedList')}
            iconName="format_list_numbered"
          />
        </div>
        <div className="flex items-center gap-4">
          <TextEditorButton
            onClick={toggleCodeBlock}
            isActive={props.editor?.isActive('codeBlock')}
            iconName="code"
          />
          <label htmlFor="image-input" className="cursor-pointer">
            <span className="material-symbols-outlined">image</span>
          </label>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            name="image-input"
            id="image-input"
            onChange={insertImage}
          />
        </div>
      </div>
      <EditorContent
        editor={props.editor}
        className="text-md leading-6 border border-light-gray border-solid rounded-md p-2 [&_img]:text-center"
      />
    </div>
  );
};

export default BodyEditor;
