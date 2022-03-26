import type { PresignedPost } from '@aws-sdk/s3-presigned-post';

export default function buildFormData(image: File, presignedData: PresignedPost) {
  const tempFormData = new FormData();

  Object.entries(presignedData.fields).forEach(([key, value]) => tempFormData.append(key, value));

  tempFormData.append('file', image, image.name);

  return tempFormData;
}
