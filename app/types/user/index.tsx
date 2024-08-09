// /app/types/user/index.tsx

export interface Message {
  sender: string; // Assuming ObjectId is converted to string
  receiver: string;
  content: string;
  timestamp: Date; // Changed from string to Date
  from: string;
  _id: string;
}

export interface Payment {
  amount: number;
  date: Date; // Use Date if date is a Date object
  paymentMethod: string;
}

export interface UserDataType {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture?: string; // Optional
  password?: string; // Optional
  socialId?: string; // Optional
  resetPasswordToken?: string; // Optional
  currentFriends?: FriendRequestDetailsType[];
  incomingFriendRequests: FriendRequestDetailsType[];
  outgoingFriendRequests?: FriendRequestDetailsType[];
  friendRequestCount?: number;
  savedPosts?: string[];
  reportedPosts?: {
    postId: string;
    reason: string;
  }[];
  loginData?: {
    date: Date;
    count: number;
  }[];
  apiKey?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  role?: string;
  status?: string;
  requestCount?: number;
  country?: string;
  state?: string;
  appName?: string;
  messages?: Message[];
  payments?: Payment[];
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

export interface FriendRequestDetailsType extends UserDataType {
  // Add any additional fields specific to friend requests here if needed
}