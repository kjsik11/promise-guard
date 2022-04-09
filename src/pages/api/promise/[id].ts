import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';
import { collection } from '@backend/collection';
import { promiseValidator } from '@backend/model/promise/validator';

import { ApiError } from '@utils/api-error';
import checkAdmin from '@utils/check-admin';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  checkAdmin(req);

  const queryValidator = Joi.object({
    id: Joi.string().required(),
  }).required();

  const { id } = (await queryValidator.validateAsync(req.query)) as { id: string };

  const promiseCol = await collection.promise();

  if (req.method === 'GET') {
    const promise =
      (await promiseCol.findOne(
        { _id: new ObjectId(id), deletedAt: null },
        { projection: { _id: 0, title: 1, body: 1, categories: 1, tags: 1, coreFlag: 1 } },
      )) ?? [];

    return res.status(StatusCodes.OK).json(promise);
  }

  if (req.method === 'POST') {
    const promise = await promiseCol.findOne(
      { _id: new ObjectId(id), deletedAt: null },
      { projection: { _id: 0 } },
    );

    if (!promise) throw new ApiError('VALIDATION_ERROR');

    await promiseCol.insertOne({ ...promise, createdAt: new Date() });

    return res.status(StatusCodes.CREATED).end();
  }

  if (req.method === 'PUT') {
    const body = await promiseValidator(req.body);

    await promiseCol.updateOne({ _id: new ObjectId(id), deletedAt: null }, { $set: { ...body } });

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  if (req.method === 'PATCH') {
    const validator = Joi.object({
      tags: Joi.array().items(Joi.string().max(30)).max(20),
    }).required();

    const { tags } = (await validator.validateAsync(req.body)) as { tags: string[] };

    await promiseCol.updateOne({ _id: new ObjectId(id), deletedAt: null }, { $set: { tags } });

    return res.status(StatusCodes.NO_CONTENT).end();
  }

  if (req.method === 'DELETE') {
    await promiseCol.updateOne(
      { _id: new ObjectId(id), deletedAt: null },
      { $set: { deletedAt: new Date() } },
    );

    return res.status(StatusCodes.NO_CONTENT).end();
  }
};

export default new NextApiBuilder(handler).build();
