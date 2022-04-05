import Joi from 'joi';

import type { PromiseType } from '@backend/model/promise';

export const promiseValidator: (promiseInput: unknown) => Promise<PromiseType> = async (
  promiseInput,
) => {
  const validator = Joi.object({
    title: Joi.string().max(50).required(),
    body: Joi.string().required(),
    categories: Joi.array().items(Joi.string().max(30)).max(20),
    tags: Joi.array().items(Joi.string().max(30)).max(20),
    coreFlag: Joi.boolean().default(false),
  }).required();

  return (await validator.validateAsync(promiseInput)) as PromiseType;
};

export const promiseIdValidator: (input: unknown) => Promise<{ promiseId: string }> = async (
  input,
) => {
  const validator = Joi.object({
    promiseId: Joi.string().required(),
  }).required();
  return (await validator.validateAsync(input)) as { promiseId: string };
};
