import TextEditor from '@/app/components/TextEditor';
import { customFetch } from '@/app/helpers/auth';
import React from 'react';
export interface ICreatePostRequest {
  html_content: string;
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
