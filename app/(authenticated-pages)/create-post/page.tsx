import TextEditor from '@/app/components/TextEditor';
import { prisma } from '@/app/helpers/api';
import { getActiveUser } from '@/app/helpers/auth';
import { JSONContent } from '@tiptap/react';
import React from 'react';

export interface ICreatePostRequest {
  html_content: string;
  json_content: JSONContent;
  categoryIds: number[];
  title: string;
  summary: string;
}

const CreatePost = async () => {
  const categories = await prisma.categories.findMany();

  async function handleCreate(props: ICreatePostRequest) {
    'use server';
    const activeUser = getActiveUser();
    if (activeUser?.id) {
      await prisma.posts.create({
        data: {
          html_content: props.html_content,
          json_content: props.json_content,
          summary: props.summary,
          title: props.title,
          post_categories: {
            create: props.categoryIds.map((categoryId) => ({
              categories_id: categoryId,
            })),
          },
          users_id: activeUser.id,
        },
      });
    }
  }

  return (
    <div>
      <TextEditor categories={categories} createPost={handleCreate} />
    </div>
  );
};

export default CreatePost;
