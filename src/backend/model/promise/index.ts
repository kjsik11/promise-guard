import type { ObjectId } from 'mongodb';

export interface MyPromiseType {
  view: {
    items: PromiseTypeFront[];
    count: number;
  };
  recommended: {
    items: PromiseTypeFront[];
    count: number;
  };
  notRecommended: {
    items: PromiseTypeFront[];
    count: number;
  };
}

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
  notRecommendedCount: number;
  viewCount: number;
  createdAt: OurDate;
  deletedAt: OurDate | null;
}

export type PromiseTypeFront = Omit<PromiseTypeBSON, 'body' | 'createdAt' | 'deletedAt'>;

export const initialPromise: PromiseType = {
  title: '',
  body: '',
  categories: [],
  tags: [],
  coreFlag: false,
};
