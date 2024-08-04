import TextEditor from '@/app/components/TextEditor';
import { customFetch } from '@/app/helpers/auth';
import { JSONContent } from '@tiptap/react';
import React from 'react';
export interface ICreatePostRequest {
  html_content: string;
  json_content?: JSONContent;
  categoryIds: number[];
  title: string;
  summary: string;
  coverImagePath?: string;
}

export interface IImageUploadResponse {
  imagePath: string;
}

const CreatePost = async () => {
  const categoriesRes = await customFetch(`${process.env.API_URL}/categories`);
  const categories = await categoriesRes.json();

  return (
    <div>
      <TextEditor categories={categories} />
    </div>
  );
};

export default CreatePost;
