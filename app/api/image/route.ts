import { s3Client } from '@/app/helpers/s3';
import { DeleteObjectsCommand } from '@aws-sdk/client-s3';

export async function DELETE(request: Request) {
  const { imageIds } = await request.json();
  const command = new DeleteObjectsCommand({
    Bucket: process.env.AWS_BUCKET_NAME || '',
    Delete: {
      Objects: imageIds.map((id: string) => ({ Key: id })),
    },
  });

  try {
    const { Deleted } = await s3Client.send(command);
    console.log(
      `Successfully deleted ${Deleted?.length} objects from S3 bucket. Deleted objects:`
    );
    console.log(Deleted?.map((d) => ` • ${d.Key}`).join('\n'));
    return Response.json({ data: Deleted });
  } catch (err) {
    console.error(err);
    return Response.json({ error: err?.message });
  }
}
