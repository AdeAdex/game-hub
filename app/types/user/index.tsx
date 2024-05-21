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

// /app/types/activity.ts

export interface ActivityType {
  userId: string;
  type: "login" | "password_change" | "profile_update";
  description: string;
  device: string; // Add device field
  location: string; // Change location to string
  date: string;
}
