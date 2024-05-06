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
          cover_image: props.coverImagePath,
        },
      });
    }
  }

  async function uploadBase64Image(image: string) {
    'use server';
    const buffer = Buffer.from(image);
    const uploadPath = path.join(
      process.cwd(),
      'public',
      'uploads',
      'cover-images',
      new Date().getTime().toString()
    );
    await fs.promises.writeFile(uploadPath, buffer);
    return uploadPath;
  }

  async function uploadCoverImage(imageData: FormData) {
    'use server';
    const image = imageData.get('image') as File;
    if (image) {
      try {
        const uploadPath = path.join(
          process.cwd(),
          'public',
          'uploads',
          'cover-images',
          image.name
        );
        const arrayBuffer = await image.arrayBuffer();
        const imageBuffer = new Uint8Array(arrayBuffer);
        await fs.promises.writeFile(uploadPath, imageBuffer);
        return { imagePath: '/uploads/cover-images/' + image.name };
      } catch (error) {
        console.error('ERROR UPLOADING FILE');
        console.error(error);
        throw error;
      }
    }
  }

  async function deleteImage(relativeImagePath: string) {
    'use server';
    try {
      const absolutePath = path.resolve(relativeImagePath);
      console.log(absolutePath);

      await fs.promises.unlink(absolutePath);
    } catch (error) {
      console.error('ERROR DELETING FILE');
      throw error;
    }
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
