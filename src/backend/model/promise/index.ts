import type { ObjectId } from 'mongodb';

export interface PromiseType {
  title: string;
  body: string;
  categories: string[];
  tags: string[];
  coreFlag: boolean;
}

export interface PromiseTypeBSON extends PromiseType {
  _id: ObjectId | string;
  recommendedIds: ObjectId[];
  recommendedCount: number;
  nonRecommendedIds: ObjectId[];
  nonRecommendedCount: number;
  viewCount: number;
  createdAt: OurDate;
  deletedAt: OurDate | null;
}

export const initialPromise: PromiseType = {
  title: '',
  body: '',
  categories: [],
  tags: [],
  coreFlag: false,
};
