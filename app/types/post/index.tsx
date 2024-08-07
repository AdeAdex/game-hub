// /app/types/post/index.tsx

import { CommentDataType } from "../comments";
import { UserDataType } from "../user";

export interface PostDataType {
  _id: string;
  content: string;
  timestamp: string;
  userId: UserDataType;
  likes: number;
  dislikes: number;
  likedBy: string[];
  comments: CommentDataType[];
  image: string;
}


// export interface PostDataType {
//   _id: string;
//   content: string;
//   timestamp: Date; // Changed from string to Date
//   userId: string; // Changed from UserDataType to string
//   likes: number;
//   dislikes: number;
//   likedBy: string[];
//   comments: CommentDataType[];
//   image?: string; // Made optional
// }