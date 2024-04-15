'use client'

import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import MediaCarousel from "./MediaCarousel";
import avatar from "../../../public/images/robot.png";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio: string;
}

interface Post {
  _id: string;
  content: string;
  timestamp: string;
  userId: User;
  likes: number;
  dislikes: number;
  likedBy: string[];
  image: string;
}

interface PostProps {
  posts: Post[];
  likedPosts: string[];
  handleReaction: (postId: string) => void;
  handleComment: (postId: string) => void;
  handleShare: (postId: string) => void;
}

const PostComponent: React.FC<PostProps> = ({
  posts,
  likedPosts,
  handleReaction,
  handleComment,
  handleShare,
}) => {
  const [showCarousel, setShowCarousel] = useState(false);

  const openImage = (image: string) => {
    console.log(image);
    // setShowCarousel(true);
  };

  return (
    <div className="">
      {posts.map((post) => (
        <div key={post._id} className="bg-white mb-4 p-4 rounded-lg shadow-md ">
          <div className="flex items-center mb-2">
            <div className="relative w-8 h-8 mr-2">
              {post.userId.profilePicture && (
                <div className="relative w-8 h-8 mr-2">
                  <Image
                    src={post.userId.profilePicture}
                    alt="Profile Picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                </div>
              )}
            </div>
            <p className="text-[12px] text-gray-700 font-semibold">
              {post.userId.firstName} {post.userId.lastName}
            </p>
          </div>
          <p className="text-gray-700 mb-2">
            {post.content && (
              <small className="text-[14px]">{post.content}</small>
            )}
          </p>
          <>
          {showCarousel && <MediaCarousel images={[post.image]}/>} 
            {post.image ? (
              <Image
                src={post.image}
                alt="PostImage"
                width={400}
                height={400}
                className="w-full cursor-pointer"
                priority
                onClick={() => openImage(post.image)}
              />
            ) : (
          <Image
                src={avatar}
                alt="PostImage"
                width={400}
                height={400}
                className="w-full cursor-pointer"
                priority
                onClick={() => openImage(post.image)}
              />
            ) }
          </>
          <div className="flex justify-between items-center mt-2 px-4 text-gray-500 text-[12px]">
            {likedPosts.includes(post._id) ? (
              <>
                {post.likedBy.length > 1 ? (
                  <small>You and {post.likedBy.length - 1} others</small>
                ) : (
                  <small>{post.likedBy.length}</small>
                )}
              </>
            ) : (
              <small>{post.likedBy.length}</small>
            )}
          </div>

          <hr className="my-2 border-gray-300" />
          <div className="flex justify-between items-center mt-2 px-4 text-gray-500">
            <button
              onClick={() => handleReaction(post._id)}
              className="text-[8px]"
            >
              {likedPosts.includes(post._id) ? (
                <>
                  <AiFillLike className="mx-auto text-blue-500" size={15} />
                  Unlike
                </>
              ) : (
                <>
                  <AiOutlineLike className="mx-auto" size={15} />
                  Like
                </>
              )}
            </button>

            <button
              onClick={() => handleComment(post._id)}
              className="text-[8px]"
            >
              <FaComment className="mx-auto" size={12} /> Comment
            </button>
            <button
              onClick={() => handleShare(post._id)}
              className="text-[8px]"
            >
              <FaShare className="mx-auto" size={12} /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostComponent;
