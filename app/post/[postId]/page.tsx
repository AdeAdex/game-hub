// /app/post/[postId]/page.tsx

'use client' 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/navbar/Navbar';
import PostComponent from '../../../../components/userPage/PostComponent';
import LoadingSkeleton from '../../../../components/userPage/LoadingSkeleton';
import axios from 'axios';

const PostPage: React.FC = ({ params }) => {
  const router = useRouter();
  //const { postId } = router.query;
  const { postId } =  params 
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.post(`/api/posts/${postId}`, {postId} );
        setPost(response.data); // Assuming your API returns the post data
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (router.isFallback || loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
        {/* Render PostComponent with the specific post */}
        <PostComponent
          posts={[post]} // Pass the post as an array to match the expected prop in PostComponent
          likedPosts={[]} // Assuming likedPosts is handled separately
          handleReaction={(postId: string) => {}} // Implement handleReaction function
          handleShare={(postId: string, userId: string) => {}} // Implement handleShare function
          setPosts={(updatedPosts: any) => {}} // Implement setPosts function if needed
          openCreatePostModal={false}
          setOpenCreatePostModal={(open: boolean) => {}} // Implement setOpenCreatePostModal function if needed
          user={null} // Assuming user data is handled separately
          editSelectedPost=""
          setEditSelectedPost={(postId: string) => {}} // Implement setEditSelectedPost function if needed
          selectedPost={post}
          setSelectedPost={(post: any) => {}} // Implement setSelectedPost function if needed
          loggedInUserId="" // Assuming logged-in user ID is handled separately
        />
      </div>
    </div>
  );
};

export default PostPage;
