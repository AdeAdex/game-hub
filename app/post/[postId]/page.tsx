//   /app/post/[postId]/page.tsx

"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import LoadingSkeleton from "@/app/components/userPage/LoadingSkeleton";
import Navbar from "@/app/components/navbar/Navbar";
import { PostDataType } from "@/app/types/post";
// import PostComponent from "@/app/components/userPage/PostComponent";


interface PostsPageProps {
  params: {
    postId: string;
  };
}

const PostsPage: React.FC<PostsPageProps> = ({ params }) => {
  const router = useRouter();
  const { postId } = params;
  const [post, setPost] = useState<PostDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.post(`/api/posts/single-post`, { postId });
        setPost(response.data); // Assuming your API returns the post data
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) {
    return <LoadingSkeleton/>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar onSearch={(query) => {}} suggestions={[]}/>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
        <div>Post Page</div>
        {/* {post && (
            <PostComponent
              user={user}
              posts={[post]}
              likedPosts={[]} // Assuming likedPosts is handled separately
              handleReaction={(postId: string) => {}} // Implement handleReaction function
              handleShare={(postId: string, userId: string) => {}} // Implement handleShare function
              openCreatePostModal={false}
              setOpenCreatePostModal={(open: boolean) => {}} // Implement setOpenCreatePostModal function if needed
              editSelectedPost=""
              setEditSelectedPost={(postId: string) => {}} // Implement setEditSelectedPost function if needed
              loggedInUserId={user._id} // Assuming logged-in user ID is handled separately
            />
          )} */}
      </div>
    </div>
  );
};

export default PostsPage;
