import buildFormData from '@utils/aws/build-formdata';

import { fetcher } from './fetcher';

import type { PresignedPost } from '@aws-sdk/s3-presigned-post';

const prefix = 'images';

export async function uploadImage(image: File): Promise<string> {
  const { _id, presignedPost } = await fetcher
    .get(`/api/presigned-url?prefix=${prefix}`)
    .json<{ _id: string; presignedPost: PresignedPost }>();

  const formData = buildFormData(image, presignedPost);

  // Upload image files to AWS S3
  await fetcher.post(presignedPost.url, { body: formData });

  return _id;
}
