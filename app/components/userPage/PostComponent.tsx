// app/components/userPage/PostComponent.tsx

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaComment, FaShare, FaGlobeAfrica } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import MediaCarousel from "./MediaCarousel";
import avatar from "../../../public/images/robot.png";
import LikedUserModal from "./LikedUserModal";
import { CiMenuKebab } from "react-icons/ci";
import PostActionModal from "./PostActionModal";
import CommentFullScreenDialog from "./CommentFullScreenDialog";
import { useRouter } from "next/navigation";
import { PostDataType } from "@/app/types/post";
import { UserDataType } from "@/app/types/user";


interface PostProps {
  posts: PostDataType[];
  likedPosts: string[];
  handleReaction: (postId: string) => void;
  handleShare: (postId: string, userId: string) => void;
  user: UserDataType;
  setPosts: React.Dispatch<React.SetStateAction<PostDataType[]>>;
  openCreatePostModal: boolean;
  setOpenCreatePostModal: React.Dispatch<boolean>;
  editSelectedPost: string;
  setEditSelectedPost: React.Dispatch<string>;
  selectedPost:PostDataType | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<PostDataType | null>>;
}

const PostComponent: React.FC<PostProps & { loggedInUserId: string }> = ({
  posts,
  setPosts,
  likedPosts,
  handleReaction,
  handleShare,
  loggedInUserId,
  openCreatePostModal,
  setOpenCreatePostModal,
  user,
  editSelectedPost,
  setEditSelectedPost,
  selectedPost,
  setSelectedPost,
}) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPostLikedBy, setSelectedPostLikedBy] = useState<string[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState<boolean>(false);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const router = useRouter();

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
      setOpenModal(true);
      //setOpenCreatePostModal(true)
    }
  };

  const handleOpenCommentDialog = (postId: string) => {
    const post = posts.find((post) => post._id === postId);
    if (post) {
      setSelectedPost(post);
      setSelectedPostId(postId);
      setOpenCommentDialog(true);
    }
  };

  const calculateElapsedTime = (timestamp: string): string => {
    const commentTimestamp = new Date(timestamp);
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - commentTimestamp.getTime();

    // Calculate elapsed minutes
    const elapsedMinutes = Math.floor(timeDifference / (1000 * 60));
    if (elapsedMinutes < 60) {
      return `${elapsedMinutes} min ago`;
    }

    // Calculate elapsed hours
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) {
      return `${elapsedHours} hour${elapsedHours > 1 ? "s" : ""} ago`;
    }

    // Calculate elapsed days
    const elapsedDays = Math.floor(elapsedHours / 24);
    return `${elapsedDays} day${elapsedDays > 1 ? "s" : ""} ago`;
  };

  // const handlePostPage = (postId: string) => {
  //   router.push(`/post/${postId}`);
  // }; 

  const handlePostPage = (postId: string) => {
    router.push(`/user/${user.userName}/post/${postId}`);
  };
  

  // console.log("post mi re", posts);

  return (
    <div className="">
      {posts.length > 0 ? ( // Check if there are posts available
        posts.map((post) => (
          <div
            key={post._id}
            className="bg-white mb-4 p-4 rounded-lg shadow-md "
          >
            <div className="flex justify-between">
              <div className="flex items-center mb-2 cursor-pointer w-[80%]" onClick={() => handlePostPage(post._id)} >
                <div className="relative w-8 h-8 mr-2">
                  {post.userId.profilePicture ? (
                    <div className="relative w-8 h-8 mr-2">
                      <Image
                        src={post?.userId?.profilePicture}
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
                <div className="text-[12px] text-gray-700 font-semibold">
                  <div>
                    {post.userId
                      ? `${post.userId.firstName} ${post.userId.lastName}`
                      : "Unknown User"}
                  </div>
                  <div className="flex gap-1">
                    <small className="flex justify-between text-[10px] ">
                      {calculateElapsedTime(post.timestamp)}
                    </small>
                    <FaGlobeAfrica size={13} className="my-auto" />
                  </div>
                </div>
              </div>
              <CiMenuKebab
                className="flex cursor-pointer "
                onClick={() => handleToggleModal(post._id)}
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
    // More than one person liked the post
    likedPosts.includes(post._id) ? (
      // User liked the post
      <>You and {post.likedBy.length - 1} others</>
    ) : (
      // User did not like the post
      <>{post.likedBy.length} liked</>
    )
  ) : (
    // Only one person liked the post
    likedPosts.includes(post._id) ? (
      // User liked the post and is the only one
      <>
        {post.likedBy[0]._id === loggedInUserId ? (
          // User who liked the post is the logged-in user
          <>{post.likedBy[0].firstName} liked</>
        ) : (
          // Other user liked the post
          <>{post.likedBy.length} liked</>
        )}
      </>
    ) : (
      // No one liked the post
      <>0 likes</>
    )
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

              <small
                className="cursor-pointer"
                onClick={() => handleOpenCommentDialog(post._id)}
              >
                {post.comments.length > 0 && (
                  <>
                    {post.comments.length}{" "}
                    {post.comments.length === 1 ? "comment" : "comments"}
                  </>
                )}
              </small>
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
                onClick={() => handleOpenCommentDialog(post._id)}
                className="text-[8px]"
              >
                <FaComment className="mx-auto" size={12} /> Comment
              </button>
              <button
                onClick={() => handleShare(post._id, post.userId.firstName)}
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
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          open={openModal}
          handleClose={() => setOpenModal(false)}
          post={selectedPost}
          setPosts={setPosts}
          loggedInUserId={loggedInUserId}
          openCreatePostModal={openCreatePostModal}
          setOpenCreatePostModal={setOpenCreatePostModal}
          user={user}
          editSelectedPost={editSelectedPost}
          setEditSelectedPost={setEditSelectedPost}
        />
      )}

      {openCommentDialog && (
        <CommentFullScreenDialog
          openCommentDialog={openCommentDialog}
          setOpenCommentDialog={setOpenCommentDialog}
          user={user}
          selectedPostId={selectedPostId}
          post={selectedPost}
        />
      )}
    </div>
  );
};

export default PostComponent;
