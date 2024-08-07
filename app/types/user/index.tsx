// /app/types/user/index.tsx


export interface Message {
  sender: string; // Assuming ObjectId is converted to string
  receiver: string;
  content: string;
  timestamp: Date;
}

export interface Payment {
  amount: number;
  date: Date;
  paymentMethod: string;
}

export interface UserDataType {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  role?: string;
  status?: string;
  currentFriends?: string[];
  apiKey?: string;
  incomingFriendRequests?: string[];
  friendRequestCount?: number;
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


  // export interface UserDataType {
  //   _id: string;
  //   firstName: string;
  //   lastName: string;
  //   userName: string;
  //   email: string;
  //   profilePicture: string;
  //   bio: string;
  //   phone?: string;
  //   linkedin?: string;
  //   twitter?: string;
  //   facebook?: string;
  //   role?: string;
  //   status?: string;
  //   currentFriends?: string[];
  //   apiKey?: string;
  // }
  
