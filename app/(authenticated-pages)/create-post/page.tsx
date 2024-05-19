import TextEditor from '@/app/components/TextEditor';
import { prisma } from '@/app/helpers/api';
import { getActiveUser } from '@/app/helpers/auth';
import { JSONContent } from '@tiptap/react';
import React from 'react';
import path from 'path';
import fs from 'fs';
export interface ICreatePostRequest {
  html_content: string;
  json_content: JSONContent;
  categoryIds: number[];
  title: string;
  summary: string;
  coverImagePath?: string;
}

export interface IImageUploadResponse {
  imagePath: string;
}

const CreatePost = async () => {
  const categories = await prisma.categories.findMany();

  async function handleCreate(props: ICreatePostRequest) {
    'use server';
    try {
      const activeUser = getActiveUser();
      if (activeUser?.id) {
        const res = await prisma.posts.create({
          data: {
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
          },
        });
      }
    } catch (error) {
      console.error('ERROR CREATING POST');
      console.error(error);
      throw error;
    }
  }

  async function uploadBase64Image(image: string) {
    'use server';
    const strippedImage = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(strippedImage, 'base64');
    const databasePath =
      path.join('/uploads', 'cover-images', new Date().getTime().toString()) +
      '.png';
    const uploadPath = path.join(process.cwd(), 'public', databasePath);
    await fs.promises.writeFile(uploadPath, buffer);
    return databasePath;
  }

  return (
    <div>
      <TextEditor
        uploadCoverImage={uploadBase64Image}
        categories={categories}
        createPost={handleCreate}
      />
    </div>
  );
};

export default CreatePost;
