// app/user/[username]/post/[postId]/page.tsx

"use client"


import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import LoadingSkeleton from '@/app/components/userPage/LoadingSkeleton';
import Navbar from '@/app/components/navbar/Navbar';
import PostComponent from '@/app/components/userPage/PostComponent';
import { PostDataType } from '@/app/types/post';


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
  const [post, setPost] = useState<PostDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.post(`/api/posts/single-post`, { postId });
        setPost(response.data); // Assuming your API returns the post data
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postId && username) {
      fetchPost();
    }
  }, [postId, username]);

  // Render loading skeleton while data is being fetched
  if (loading) {
    return <LoadingSkeleton />;
  }

  // Render post content once data is fetched
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
        {/* Display post content */}
       {/* {post ? (
          <PostComponent
            posts={[post]}
            likedPosts={[]} // Assuming likedPosts is handled separately
            handleReaction={(postId: string) => {}} // Implement handleReaction function
            handleShare={(postId: string, userId: string) => {}} // Implement handleShare function
            user={post.userId}
            loggedInUserId={post.userId._id} // Assuming logged-in user ID is handled separately
            setPosts={undefined} // Provide the correct value if needed
            openCreatePostModal={false} // Provide the correct value if needed
            setOpenCreatePostModal={undefined} // Provide the correct value if needed
            editSelectedPost="" // Provide the correct value if needed
            setEditSelectedPost={undefined} // Provide the correct value if needed
            selectedPost={null} // Provide the correct value if needed
            setSelectedPost={undefined} // Provide the correct value if needed
          />
        ) : (
          <p>No post found</p>
        )} */}
      </div>
    </div>
  );
};

export default UserPostPage;
