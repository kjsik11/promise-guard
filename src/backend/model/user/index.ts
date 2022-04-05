import type { ObjectId } from 'mongodb';

export type User = {
  _id: ObjectId;
  user_id: number;
  info: UserInfo;
  recentView: string[];
  recommended: string[];
  notRecommended: string[];
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
