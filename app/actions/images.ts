'use server';

import { customFetch } from '../helpers/auth';

export async function deleteImages(imageIds: string[]) {
  'use server';
  try {
    await customFetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/image', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageIds }),
    });
  } catch (error) {
    console.error(error);
  }
}
