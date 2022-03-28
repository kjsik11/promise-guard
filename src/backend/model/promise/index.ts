import type { ObjectId } from 'mongodb';

export interface PromiseType {
  title: string;
  body: string;
  tag: string[];
}

export interface PromiseTypeBSON extends PromiseType {
  _id: ObjectId | string;
  createdAt: OurDate;
  deletedAt: OurDate | null;
}

export const initialPromise: PromiseType = {
  title: '',
  body: '',
  tag: [],
};
