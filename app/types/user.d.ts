export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  profilePicture: string;
  coverPhoto: string;
  followers: string[];
  following: string[];
  isVerified: boolean;
  website: string;
  location: string;
  terms: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
