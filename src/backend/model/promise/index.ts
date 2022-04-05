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
  recommendedCount: number;
  nonRecommendedCount: number;
  viewCount: number;
  createdAt: OurDate;
  deletedAt: OurDate | null;
}

export type PromiseTypeFront = Omit<PromiseTypeBSON, 'createdAt' | 'deletedAt'>;

export const initialPromise: PromiseType = {
  title: '',
  body: '',
  categories: [],
  tags: [],
  coreFlag: false,
};
