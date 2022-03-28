import { StatusCodes } from 'http-status-codes';
import { ObjectId } from 'mongodb';

import { NextApiBuilder } from '@backend/api-wrapper';
import type { PromiseTypeBSON } from '@backend/model/promise';
import { promiseValidator } from '@backend/model/promise/validator';

import { connectMongo } from '@utils/mongodb/connect';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { db } = await connectMongo();

    const promiseList = await db
      .collection<PromiseTypeBSON>('promise')
      .find({ deletedAt: null })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(StatusCodes.OK).json(promiseList);
  }

  if (req.method === 'POST') {
    const body = await promiseValidator(req.body);

    const { db } = await connectMongo();

    const _id = new ObjectId();

    await db.collection<PromiseTypeBSON>('promise').insertOne({
      ...body,
      _id,
      createdAt: new Date(),
      deletedAt: null,
    });

    return res.status(StatusCodes.CREATED).end();
  }
};

export default new NextApiBuilder(handler).build();
