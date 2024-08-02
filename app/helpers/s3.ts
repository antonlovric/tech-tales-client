import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function uploadImage(image: File) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + '/api/upload',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filename: image.name, contentType: image.type }),
    }
  );

  if (response.ok) {
    const { url, fields } = await response.json();
    const formData = new FormData();

    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formData.append('file', image);

    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (uploadResponse.ok) {
      return url + fields.key;
    } else {
      console.error('S3 Upload Error:', uploadResponse);
      alert('Upload failed.');
    }
  } else {
    alert('Failed to get pre-signed URL.');
  }
}
