import React from "react";
import Image from "next/image";
import avatar from "../../../public/images/robot.png";
import PostModal from "./PostModal";

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
  image: string;
}

interface PostButtonProps {
  user: User;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  openCreatePostModal: boolean;
  setOpenCreatePostModal: React.Dispatch<boolean>;
  editSelectedPost: string;
  setEditSelectedPost: React.Dispatch<string>;
  selectedPost: Post | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>;
}

const PostButton: React.FC<PostButtonProps> = ({
  user,
  setOpenCreatePostModal,
  openCreatePostModal,
  setPosts,
  editSelectedPost,
  setEditSelectedPost,
  selectedPost,
  setSelectedPost
}) => {
  const handleOpen = () => {
    setOpenCreatePostModal(true);
  };

  return (
    <div>
      <div className="flex gap-2 bg-white mb-4 p-4 rounded-lg shadow-md mt-6 ">
        <div className="relative w-8 h-8 mr-2">
          {user.profilePicture ? (
            <div className="relative w-10 h-10 mr-2">
              <Image
                src={user.profilePicture}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="relative w-10 h-10 mr-2">
              <Image
                src={avatar}
                alt="Profile Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          )}
        </div>
        <input
          onClick={handleOpen}
          type="text"
          readOnly
          placeholder={`What's on your mind ${user.firstName}`}
          className="hover:bg-gray-200 bg-gray-100 cursor-pointer rounded-lg py-2 px-3 w-full focus:outline-none focus:border-none"
        />
      </div>
      <PostModal
        user={user} // Make sure to replace `user` with the actual user object
        setPosts={setPosts}
        editSelectedPost={editSelectedPost}
        setEditSelectedPost={setEditSelectedPost}
        openCreatePostModal={openCreatePostModal}
        setOpenCreatePostModal={setOpenCreatePostModal}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </div>
  );
};

export default PostButton;
