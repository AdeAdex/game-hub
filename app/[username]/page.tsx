// /app/[username]/page.tsx 

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import LoadingSkeleton from "../components/userPage/LoadingSkeleton";
import UserProfileSection from "../components/userPage/UserProfileSection";
import Post from "../components/userPage/PostComponent";
import UserAvatarSection from "../components/userPage/UserAvatarSection";
import PostButton from "../components/userPage/PostButton";
import { PostDataType } from "../types/post";
import Footer from "../components/footer/Footer";
import { useSearch } from "@/app/lib/SearchContext";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { UserDataType } from "@/app/types/user";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const router = useRouter();
  const { username } = params;
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<PostDataType[]>([]);
  const [newImage, setNewImage] = useState("");
  const [cloudImage, setCloudImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [openCreatePostModal, setOpenCreatePostModal] = useState<boolean>(false);
  const [editSelectedPost, setEditSelectedPost] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<PostDataType | null>(null);
  const { handleSearch, suggestions } = useSearch();
  const userInformation = useSelector(
    (state: RootState) => state.auth.userInformation
  ) as UserDataType | null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const files = e.target.files;
    if (!files || !files[0]) {
      console.error("No file selected");
      return;
    }

    let selectedImage = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onload = () => {
      setNewImage(reader.result as string);
      const endpoint = "/api/username/upload";
      axios
        .post(endpoint, { newImage: reader.result, email: userInformation?.email })
        .then((response) => {
          setCloudImage(response.data.cloudLinkForProfilePicture);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };
  };

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        const postsResponse = await axios.get("/api/posts"); // Fetch all posts
        setPosts(postsResponse.data);

        // Fetch all posts and liked posts with user ID
        const likedResponse = await axios.post(`/api/posts/my-likes`, {
          userId: userInformation?._id,
        });
        setLikedPosts(likedResponse.data.map((post: PostDataType) => post._id));
      } catch (error) {
        console.error("Error fetching user or posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [username, router, cloudImage]);

  return (
    <div className={`dark:bg-dark-mode dark:text-gray-200 bg-gray-100 text-gray-900 min-h-screen`}>
      <Navbar onSearch={handleSearch} suggestions={suggestions} />
      {userInformation ? (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className={`dark:bg-gray-800 rounded-lg shadow-lg p-6`}>
                <UserAvatarSection
                  isLoading={isLoading}
                  user={userInformation}
                  handleFileSelect={handleFileSelect}
                />
              </div>
              <PostButton
                user={userInformation}
                setPosts={setPosts}
                openCreatePostModal={openCreatePostModal}
                setOpenCreatePostModal={setOpenCreatePostModal}
                editSelectedPost={editSelectedPost}
                setEditSelectedPost={setEditSelectedPost}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
              />

              <div className="mt-8 hidden md:flex flex-col">
                <UserProfileSection email={userInformation.email}/>
              </div>
            </div>
            <div className="md:col-span-2">
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <Post
                  user={userInformation}
                  posts={posts}
                  setPosts={setPosts}
                  likedPosts={likedPosts}
                  setLikedPosts={setLikedPosts}
                  loggedInUserId={userInformation._id}
                  openCreatePostModal={openCreatePostModal}
                  setOpenCreatePostModal={setOpenCreatePostModal}
                  editSelectedPost={editSelectedPost}
                  setEditSelectedPost={setEditSelectedPost}
                  selectedPost={selectedPost}
                  setSelectedPost={setSelectedPost}
                  username={username}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg text-red-600">User not found</p>
      )}
      <Footer/>
    </div>
  );
};

export default UserPage;
