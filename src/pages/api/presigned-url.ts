import {
  createPresignedPost,
  PresignedPost,
  PresignedPostOptions,
} from '@aws-sdk/s3-presigned-post';
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';

import { connectS3 } from '@utils/aws/s3';
import { AWS_BUCKET_NAME } from '@utils/env/internal';

import type { NextApiHandler } from 'next';

export type GetPresignedResponse = {
  _id: ObjectId;
  presignedPost: PresignedPost;
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    // Validation
    const queryValidator = Joi.object({ prefix: Joi.string().required() }).required();
    const { prefix } = (await queryValidator.validateAsync(req.query)) as { prefix: string };

    // Logic
    const configuration: Omit<PresignedPostOptions, 'Key'> = {
      Bucket: AWS_BUCKET_NAME,
      Conditions: [
        { acl: 'public-read' },
        { bucket: AWS_BUCKET_NAME },
        ['content-length-range', 0, 10 * 1024 * 1024], // < 10MB
      ],
      Fields: { acl: 'public-read' },
      Expires: 60,
    };

    const objectId = new ObjectId();

    const s3Client = connectS3();

    const presignedPost = await createPresignedPost(s3Client, {
      ...configuration,
      Key: `${prefix}/${objectId}.jpg`,
    });

    // Result
    const resBody = { _id: objectId, presignedPost } as GetPresignedResponse;

    return res.status(StatusCodes.CREATED).json(resBody);
  }
};

export default new NextApiBuilder(handler).build();
