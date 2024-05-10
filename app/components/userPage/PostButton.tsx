import React from "react";
import Image from "next/image";
import avatar from "../../../public/images/robot.png";
import PostModal from "./PostModal";
import { UserDataType } from "@/app/types/user";
import { PostDataType } from "@/app/types/post";


interface PostButtonProps {
  user: UserDataType;
  setPosts: React.Dispatch<React.SetStateAction<PostDataType[]>>;
  openCreatePostModal: boolean;
  setOpenCreatePostModal: React.Dispatch<boolean>;
  editSelectedPost: string;
  setEditSelectedPost: React.Dispatch<string>;
  selectedPost: PostDataType | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<PostDataType | null>>;
}

const PostButton: React.FC<PostButtonProps> = ({
  user,
  setOpenCreatePostModal,
  openCreatePostModal,
  setPosts,
  editSelectedPost,
  setEditSelectedPost,
  selectedPost,
  setSelectedPost,
}) => {
  const handleOpen = () => {
    setOpenCreatePostModal(true);
  };


  return (
    <div>
      <div className="flex gap-2 bg-white mb-4 p-4 rounded-lg shadow-md mt-6 ">
        
        <div className="flex relative w-10 h-10 mr-2">
          <Image
            src={user.profilePicture || avatar}
            alt="Profile Picture"
            layout="fixed"
            width={32}
            height={32}
            className="rounded-full my-auto"
          />
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
