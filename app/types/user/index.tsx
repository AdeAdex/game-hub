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

export interface ActivityType {
  userId: string;
  type: string;
  description: string;
  device: string;
  location: {
    latitude: number;
    longitude: number;
  };
  date: string;
}

