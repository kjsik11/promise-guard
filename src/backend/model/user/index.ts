import type { ObjectId } from 'mongodb';

export type User = {
  _id: ObjectId;
  user_id: number;
  info: UserInfo;
  recentView: ObjectId[];
  recommended: ObjectId[];
  notRecommended: ObjectId[];
  lastLogin: OurDate;
  createdAt: OurDate;
};

export type UserInfo = {
  nickname: string;
};

export type KakaoUserResponse = {
  id: number;
  connected_at: string;
  properties: { nickname: string };
};
