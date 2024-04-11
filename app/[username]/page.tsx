"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { users } from "@/app/data/userData";
import axios from "axios";
import avatar from "../../public/images/robot.png";
import Image from "next/image";
import Navbar from "../components/navbar/Navbar";

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

interface Post {
  _id: number;
  content: string;
  timestamp: string;
  userId: User;
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const router = useRouter();
  const { username } = params;

  // const user = users.find((user: User) => user.username === username);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {


      const response = await axios.post(
          `/api/prompt/profile?username=${username}`,
          { username }
        );
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        router.push("/not-found"); // Redirect to 404 page if user not found
      } finally {
        setLoading(false);
      }
    };

  const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/post");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUser();
    fetchPosts(); 
  }, [username, router]);



  const [postContent, setPostContent] = useState<string>('');

    const handlePost = async () => {
        try {
          if (!user) {
                  console.error("User is null");
                        return;
                            }
          
              const response = await axios.post('/api/post', {
                      content: postContent,
                              userId: user._id // Assuming user ID is available in the user object
                                    });
                                          console.log(response);
                                                // Optionally, you can fetch the updated list of posts here and update the UI
                                                    } catch (error:any) {
                                                          console.error("Error creating post:", error);
                                                                // Handle error
                                                                    }
                                                                      };

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8  mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
                <div className="text-center">
                  <div className="rounded-full bg-gray-300 h-24 w-24 mx-auto mb-4" />
                  <div className="h-6 bg-gray-300 rounded w-2/3 mx-auto mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto" />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-1/4" />
                  </div>
                  <div className="flex justify-between mt-2">
                    <div className="h-4 bg-gray-300 rounded w-1/2" />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  {/* Add notifications component skeleton */}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                  <h2 className="text-xl font-semibold mb-4">Settings</h2>
                  {/* Add settings component skeleton */}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                  <h2 className="text-xl font-semibold mb-4">Profile Summary</h2>
                  {/* Add profile summary component skeleton */}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                {/* <p className="text-gray-700">{user.bio}</p> */}
                {/* Add more profile information sections like work experience, education, etc. */}
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Posts</h2>
                {/* Add posts component skeleton */}
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                {/* Add photos component skeleton */}
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Albums</h2>
                {/* Add albums component skeleton */}
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Activities</h2>
                {/* Add activities component skeleton */}
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8 animate-pulse">
                <h2 className="text-xl font-semibold mb-4">Friends</h2>
                {/* Add friends list component skeleton */}
              </div>
              {/* Add more sections like events, groups, etc. */}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      {user ? (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8  mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  {user.profilePicture ? (
                    <Image
                      src={user.profilePicture}
                      alt="Profile Picture"
                      width={128}
                      height={128}
                      className="mx-auto rounded-full"
                    />
                  ) : (
                    <Image
                      src={avatar}
                      alt="Avatar"
                      width={128}
                      height={128}
                      className="mx-auto rounded-full"
                    />
                  )}
                  <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="mt-1 text-lg text-gray-500">{user.userName}</p>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between">
                    {/* <p className="text-lg font-semibold text-gray-700">
                      User ID: {user._id}
                    </p> */}
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-700">
                      Email: {user.email}
                    </p>
                  </div>
                </div>
              </div>
              <textarea
                                  value={postContent}
                                                      onChange={(e) => setPostContent(e.target.value)}
                                                                          placeholder="Write your post..."
                                                                                              className="w-full h-32 px-3 py-2 mt-4 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                                                                                                                />
                                                                                                                                  <button
                                                                                                                                                      onClick={handlePost}
                                                                                                                                                                          className="w-full px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                                                                                                                                                                            >
                                                                                                                                                                                                                Post
                                                                                                                                                                                                                                  </button>
              <div className="mt-8">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  {/* Add notifications component */}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Settings</h2>
                  {/* Add settings component */}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Profile Summary
                  </h2>
                  {/* Add profile summary component */}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                {/* <p className="text-gray-700">{user.bio}</p> */}
                {/* Add more profile information sections like work experience, education, etc. */}
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Posts</h2>
                  {posts.map((post) => (
                  <div key={post._id} className="mb-4">
                    <div className="flex items-center mb-2">
                      <div className="relative w-8 h-8 mr-2">
                        <Image
                          src={post.userId.profilePicture}
                          alt="Profile Picture"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      </div>
                      <p className="text-gray-700 font-semibold">{post.userId.firstName} {post.userId.lastName}</p>
                    </div>
                    <p className="text-gray-700">{post.content}</p>
                    <p className="text-gray-500">{post.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Photos</h2>
                {/* Add photos component */}
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Albums</h2>
                {/* Add albums component */}
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Activities</h2>
                {/* Add activities component */}
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Friends</h2>
                {/* Add friends list component */}
              </div>
              {/* Add more sections like events, groups, etc. */}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg text-red-600">User not found</p>
      )}
    </div>
  );
};

export default UserPage;
