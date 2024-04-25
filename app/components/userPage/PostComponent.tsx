"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import MediaCarousel from "./MediaCarousel";
import avatar from "../../../public/images/robot.png";
import LikedUserModal from "./LikedUserModal";
import { CiMenuKebab } from "react-icons/ci";
import PostActionModal from "./PostActionModal";

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
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  openCreatePostModal: boolean;
  setOpenCreatePostModal: React.Dispatch<boolean>;
}

const PostComponent: React.FC<PostProps & { loggedInUserId: string }> = ({
  posts,
  setPosts, 
  likedPosts,
  handleReaction,
  handleComment,
  handleShare,
  loggedInUserId,
  openCreatePostModal, 
  setOpenCreatePostModal
  
}) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPostLikedBy, setSelectedPostLikedBy] = useState<string[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const openImage = (image: string) => {
    console.log(image);
    // setShowCarousel(true);
  };

  const handleLikeUser = (likedBy: string[]) => {
    const filteredLikedBy = likedBy.filter((id) => id !== loggedInUserId);
    setSelectedPostLikedBy(filteredLikedBy);
    setOpen(true);
  };

  const handleToggleModal = (postId: string) => {
    const post = posts.find((post) => post._id === postId);
    if (post) {
      setSelectedPost(post);
      //setOpenModal(true);
      setOpenCreatePostModal(true) 
    }
  };

  return (
    <div className="">
      {posts.length > 0 ? ( // Check if there are posts available
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white mb-4 p-4 rounded-lg shadow-md "
          >
            <div className="flex justify-between">
              <div className="flex items-center mb-2">
                <div className="relative w-8 h-8 mr-2">
                  {post.userId.profilePicture ? (
                    <div className="relative w-8 h-8 mr-2">
                      <Image
                        src={post.userId.profilePicture}
                        alt="Profile Picture"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <Image
                      src={avatar}
                      alt="Profile Picture"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  )}
                </div>
                <p className="text-[12px] text-gray-700 font-semibold">
                  {post.userId
                    ? `${post.userId.firstName} ${post.userId.lastName}`
                    : "Unknown User"}
                </p>
              </div>
              <CiMenuKebab
                className="flex cursor-pointer "
                onClick={() => handleToggleModal(post._id) }
              />
            
            </div>
            <p className="text-gray-700 mb-2">
              {post.content && (
                <small className="text-[14px]">{post.content}</small>
              )}
            </p>
            <>
              {showCarousel && <MediaCarousel images={[post.image]} />}
              {post.image && (
                <Image
                  src={post.image}
                  alt="PostImage"
                  width={400}
                  height={400}
                  className="w-full cursor-pointer"
                  priority
                  onClick={() => openImage(post.image)}
                />
              )}
            </>
            <div className="flex justify-between items-center mt-2 px-4 text-gray-500 text-[12px]">
              <small
                className="cursor-pointer"
                onClick={() => handleLikeUser(post.likedBy)}
              >
                {post.likedBy.length > 1 ? (
                  <>You and {post.likedBy.length - 1} others</>
                ) : (
                  <>{post.likedBy.length} like</>
                )}
              </small>

              {open && (
                <LikedUserModal
                  open={open}
                  handleClose={handleClose}
                  likedBy={selectedPostLikedBy}
                  loggedInUserId={loggedInUserId}
                />
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
        ))
      ) : (
        <p>No posts to show</p> // Display this message if there are no posts
      )}
      {selectedPost && (
        <PostActionModal
          //open={openModal}
          openCreatePostModal={openCreatePostModal} 
          handleClose={() => setOpenModal(false)}
          post={selectedPost}
          setPosts={setPosts}
          loggedInUserId={loggedInUserId}
        />
      )}
    </div>
  );
};

export default PostComponent;
