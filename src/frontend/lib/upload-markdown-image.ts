import buildFormData from '@utils/aws/build-formdata';
import { PUBLIC_ENV } from '@utils/env/public';

import { fetcher } from './fetcher';

import type { PresignedPost } from '@aws-sdk/s3-presigned-post';

const prefix = 'markdown/images';

export async function uploadMarkdownImage(image: File): Promise<string> {
  const { _id, presignedPost } = await fetcher
    .get(`/api/presigned-url?prefix=${prefix}`)
    .json<{ _id: string; presignedPost: PresignedPost }>();

  const formData = buildFormData(image, presignedPost);

  // Upload image files to AWS S3
  await fetcher.post(presignedPost.url, { body: formData });

  return `${PUBLIC_ENV.NEXT_PUBLIC_AWS_CDN_URL}/${prefix}/${_id}.jpg`;
}
