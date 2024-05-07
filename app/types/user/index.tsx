// /app/types/user/index.tsx

export interface UserDataType {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio: string;
  currentFriends?: string[];
}
