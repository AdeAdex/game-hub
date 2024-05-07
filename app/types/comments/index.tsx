// /app/types/comments/index.tsx

import { UserDataType } from "../user";

export interface CommentDataType {
  // _id: string;
  // content: string;
  // postId: string;
  _id: string;
  content: string;
  postId: string;
  userId: UserDataType;
  timestamp: string; 
}
