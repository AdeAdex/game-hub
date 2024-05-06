// /app/post/[postId]/page.tsx

import React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/navbar/Navbar';
import PostComponent from '../../../../components/userPage/PostComponent';
import LoadingSkeleton from '../../../../components/userPage/LoadingSkeleton';

const PostPage: React.FC = ({ params }) => {
  const router = useRouter();
  //const { postId } = router.query;
  const { postId } = params;

  if (router.isFallback) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
        {/* Render PostComponent with the specific post */}
        <PostComponent
          posts={[post]}
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
