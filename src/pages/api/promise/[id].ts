import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';
import type { PromiseTypeBSON } from '@backend/model/promise';
import { promiseValidator } from '@backend/model/promise/validator';

import { ApiError } from '@utils/api-error';
import { connectMongo } from '@utils/mongodb/connect';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const queryValidator = Joi.object({
    id: Joi.string().required(),
  }).required();

  const { id } = (await queryValidator.validateAsync(req.query)) as { id: string };

  const { db } = await connectMongo();

  if (req.method === 'GET') {
    const promise = await db
      .collection<PromiseTypeBSON>('promise')
      .findOne(
        { _id: new ObjectId(id), deletedAt: null },
        { projection: { _id: 0, createdAt: 0, deletedAt: 0 } },
      );

    return res.status(StatusCodes.OK).json(promise);
  }

  if (req.method === 'POST') {
    const promise = await db
      .collection<Omit<PromiseTypeBSON, '_id'>>('promise')
      .findOne({ _id: new ObjectId(id), deletedAt: null }, { projection: { _id: 0 } });

    if (!promise) throw new ApiError('VALIDATION_ERROR');

    await db
      .collection<Omit<PromiseTypeBSON, '_id'>>('promise')
      .insertOne({ ...promise, createdAt: new Date() });

    return res.status(StatusCodes.CREATED).end();
  }

  if (req.method === 'PUT') {
    const body = await promiseValidator(req.body);

    await db
      .collection<PromiseTypeBSON>('promise')
      .updateOne({ _id: new ObjectId(id), deletedAt: null }, { $set: { ...body } });

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  if (req.method === 'DELETE') {
    await db
      .collection<PromiseTypeBSON>('promise')
      .updateOne({ _id: new ObjectId(id), deletedAt: null }, { $set: { deletedAt: new Date() } });

    return res.status(StatusCodes.NO_CONTENT).end();
  }
};

export default new NextApiBuilder(handler).build();
