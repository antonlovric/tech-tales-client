import TextEditor from '@/app/components/TextEditor';
import { customFetch } from '@/app/helpers/auth';
import React from 'react';

interface IEditPostPage {
  params: { postId: string };
}

const EditPost = async ({ params }: IEditPostPage) => {
  const categoriesRes = await customFetch(`${process.env.API_URL}/categories`);
  const categories = await categoriesRes.json();

  const postRes = await customFetch(
    `${process.env.API_URL}/posts/edit-post-details/${params.postId}`
  );
  const post = await postRes.json();

  return (
    <div>
      <TextEditor categories={categories} post={post} />
    </div>
  );
};

export default EditPost;
