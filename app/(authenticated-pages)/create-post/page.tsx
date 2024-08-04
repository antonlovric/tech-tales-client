import TextEditor from '@/app/components/TextEditor';
import { customFetch, getActiveUser } from '@/app/helpers/auth';
import { JSONContent } from '@tiptap/react';
import { revalidatePath } from 'next/cache';
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

  async function handleCreate(props: ICreatePostRequest) {
    'use server';

    try {
      const activeUser = getActiveUser();
      if (activeUser?.id) {
        await customFetch(`${process.env.API_URL}/posts`, {
          method: 'POST',
          body: JSON.stringify({
            html_content: props.html_content,
            json_content: props.json_content,
            summary: props.summary,
            title: props.title,
            post_categories: {
              create: props.categoryIds.map((categoryId) => ({
                categories: {
                  connect: {
                    id: categoryId,
                  },
                },
              })),
            },
            users_id: activeUser.id,
            cover_image: props.coverImagePath,
          }),
        });
      }
      revalidatePath('/');
      revalidatePath('/posts');
    } catch (error) {
      console.error('ERROR CREATING POST');
      console.error(error);
      throw error;
    }
  }

  return (
    <div>
      <TextEditor categories={categories} createPost={handleCreate} />
    </div>
  );
};

export default CreatePost;
