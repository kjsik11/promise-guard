import type { ObjectId } from 'mongodb';

export type UserBSON = {
  _id: ObjectId;
  user_id: number;
  info: UserInfo;
  connectedAt: OurDate;
  createdAt: OurDate;
};
export type UserInfo = {
  nickname: string;
};
