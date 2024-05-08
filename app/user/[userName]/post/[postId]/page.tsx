// app/user/[username]/post/[postId]/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/app/components/navbar/Navbar";
import PostComponent from "@/app/components/userPage/PostComponent";
import { PostDataType } from "@/app/types/post";
import { UserDataType } from "@/app/types/user";
import PostSkeleton from "@/app/components/userPage/PostSkeleton";

// Define props interface for the component
interface UserPostPageProps {
  params: {
    username: string;
    postId: string;
  };
}

// Define the component
const UserPostPage: React.FC<UserPostPageProps> = ({ params }) => {
  const router = useRouter();
  const { username, postId } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserDataType | null>(null);
  const [post, setPost] = useState<PostDataType | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.post(
          `/api/username/profile?username=${username}`,
          { username }
        );
        setUser(userResponse.data);

        // Fetch single post data
        const postResponse = await axios.post(`/api/posts/single-post`, {
          postId,
        });
        setPost(postResponse.data);

        // Fetch liked posts for the user
        const likedResponse = await axios.post(`/api/posts/my-likes`, {
          userId: userResponse.data._id,
        });
        setLikedPosts(likedResponse.data.map((post: PostDataType) => post._id));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [ postId, username ]);

  // Render loading PostSkeleton while data is being fetched
  if (loading) {
    return <PostSkeleton />;
  } 

  // Render post content once data is fetched
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
        {/* Display post content */}
       {post ? (  
          <PostComponent
            posts={[post]} // Pass the single post as an array to PostComponent
            // likedPosts={[]} // Assuming likedPosts is handled separately
            likedPosts={likedPosts}
            handleReaction={(postId: string) => {
              // Implement handleReaction function
            }}
            handleShare={(postId: string, userId: string) => {
              // Implement handleShare function
            }}
            user={user!} // Use optional chaining (!) to assert that user is not null
            setPosts={() => {}} // Dummy function for setPosts
            openCreatePostModal={false}
            setOpenCreatePostModal={() => {}} // Dummy function for setOpenCreatePostModal
            editSelectedPost=""
            setEditSelectedPost={() => {}} // Dummy function for setEditSelectedPost
            selectedPost={null}
            setSelectedPost={() => {}} // Dummy function for setSelectedPost
            loggedInUserId={user?._id || ""} // Use optional chaining to access user._id
          />
       ) : (
          <p>No post found</p>
        )} 
      </div>
    </div>
  );
};

export default UserPostPage;
