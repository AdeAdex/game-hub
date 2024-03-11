"use client";


import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/app/data/userData";
import axios from "axios";

interface User {
  _id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio: string;
}

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const router = useRouter();
  const { username } = params;
  

  // const user = users.find((user: User) => user.username === username);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(`/api/prompt/profile?username=${username}`, { username });
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/not-found"); // Redirect to 404 page if user not found
      }finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username, router]);

  if (loading) {
    return <p>Loading...</p>; // Display loading indicator or message
  }


  return (
    <div className="bg-gray-100 min-h-screen">
      {user ? (
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-[50px]">
          {/* Sidebar */}
          <div className="min-h-screen py-6 flex flex-col">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
              <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                <div className="max-w-md mx-auto">
                  <div className="text-center">
                    {/* <img
                      src={user.profilePicture}
                      alt="Profile Picture"
                      className="w-32 h-32 mx-auto rounded-full"
                    /> */}
                    <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                      {user.firstName} {""} {user.lastName}
                    </h1>
                    <p className="mt-1 text-lg text-gray-500">
                      {user.userName}
                    </p>
                  </div>
                  <div className="mt-8">
                    <div className="flex justify-between">
                      <p className="text-lg font-semibold text-gray-700">
                        User ID:
                      </p>
                      <p className="text-lg text-gray-700">{user._id}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-lg font-semibold text-gray-700">
                        Email:
                      </p>
                      <p className="text-lg text-gray-700">{user.email}</p>
                    </div>
                    {/* Add more user details here */}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Sidebar Components */}
            <div className="mt-8 px-4">
              {/* Notifications */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                {/* Add notifications component */}
              </div>

              {/* Settings */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                {/* Add settings component */}
              </div>

              {/* Profile Summary */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Profile Summary</h2>
                {/* Add profile summary component */}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-3/4">
            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              {/* <p className="text-gray-700">{user.bio}</p> */}
              {/* Add more profile information sections like work experience, education, etc. */}
            </div>

            {/* Posts */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Posts</h2>
              {/* Add posts component */}
            </div>

            {/* Photos */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Photos</h2>
              {/* Add photos component */}
            </div>

            {/* Albums */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Albums</h2>
              {/* Add albums component */}
            </div>

            {/* Activities */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Activities</h2>
              {/* Add activities component */}
            </div>

            {/* Friends List */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Friends</h2>
              {/* Add friends list component */}
            </div>
            
            {/* Add more sections like events, groups, etc. */}
          </div>
        </div>
      ) : (
        <p className="text-lg text-red-600">User not found</p>
      )}
    </div>
  );
};

export default UserPage;
