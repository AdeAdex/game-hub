// /app/post/[postId]/page.tsx

'use client' 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar/Navbar';
import PostComponent from '../../components/userPage/PostComponent';
import LoadingSkeleton from '../../components/userPage/LoadingSkeleton';
import axios from 'axios';


interface PostPageProps {
  params: {
    postId: string;
  };
} 

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio: string;
  currentFriends?: string[];
}

interface Post {
  _id: string;
  content: string;
  timestamp: string;
  userId: User;
  likes: number;
  dislikes: number;
  likedBy: string[]; // Add the likedBy property here
  comments: Comment[];
  image: string;
}

interface Comment {
  _id: string;
  content: string;
  postId: string;
}

const PostPage: React.FC<PostPageProps> = ({ params }) => {
  const router = useRouter();
  //const { postId } = router.query;
  const { postId } =  params 
  //const [post, setPost] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.post(`/api/posts/single-post`, { postId } );
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
         // posts={[post]} 
          user={user}
                posts={posts}
                setPosts={setPosts}
                likedPosts={likedPosts}
                handleReaction={handleReaction}
               // handleComment={handleComment}
                handleShare={handleShare}
                loggedInUserId={user._id}
                openCreatePostModal={openCreatePostModal}
                setOpenCreatePostModal={setOpenCreatePostModal}
                editSelectedPost={editSelectedPost}
                setEditSelectedPost={setEditSelectedPost}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost} 
        />
      </div>
    </div>
  );
};

export default PostPage;
