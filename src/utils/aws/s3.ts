import { S3 } from '@aws-sdk/client-s3';

import { AWS_KEY_ID, AWS_S3_REGION, AWS_SECRET } from '@utils/env/internal';

export function connectS3(): S3 {
  const credentials = {
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: AWS_SECRET,
  };

  const region = AWS_S3_REGION;
  return new S3({ credentials, region });
}
