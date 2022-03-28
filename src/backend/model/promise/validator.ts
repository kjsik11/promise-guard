import Joi from 'joi';

import type { PromiseType } from '@backend/model/promise';

export const promiseValidator: (promiseInput: unknown) => Promise<PromiseType> = async (
  promiseInput,
) => {
  const validator = Joi.object({
    title: Joi.string().max(50).required(),
    body: Joi.string().required(),
    tag: Joi.array().items(Joi.string().required().max(20)).max(20),
  }).required();

  return (await validator.validateAsync(promiseInput)) as PromiseType;
};
