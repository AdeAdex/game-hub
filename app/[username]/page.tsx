"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../components/navbar/Navbar";
import LoadingSkeleton from "../components/userPage/LoadingSkeleton";
import UserProfileSection from "../components/userPage/UserProfileSection";
import Post from "../components/userPage/PostComponent";
import UserAvatarSection from "../components/userPage/UserAvatarSection";
import PostModal from "../components/userPage/PostModal";
import PostButton from "../components/userPage/PostButton";

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

interface UserPageProps {
  params: {
    username: string;
  };
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

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const router = useRouter();
  const { username } = params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newImage, setNewImage] = useState("");
  const [cloudImage, setCloudImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [openCreatePostModal, setOpenCreatePostModal] =
    useState<boolean>(false);
  const [editSelectedPost, setEditSelectedPost] = useState<string>("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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
      // console.log(reader.result)
      const endpoint = "/api/username/upload";
      axios
        .post(endpoint, { newImage: reader.result, email: user?.email })
        .then((response) => {
          // console.log(response.data.cloudLinkForProfilePicture);
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
        const userResponse = await axios.post(
          `/api/username/profile?username=${username}`,
          { username }
        );
        setUser(userResponse.data);

        const postsResponse = await axios.get("/api/posts"); // Fetch all posts
        setPosts(postsResponse.data);

        // Fetch all posts and liked posts with user ID
        const likedResponse = await axios.post(`/api/posts/my-likes`, {
          userId: userResponse.data._id,
        });
        console.log("likedResponse", likedResponse.data);
        setLikedPosts(likedResponse.data.map((post: Post) => post._id));
        // setLikedPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching user or posts:", error);
        // router.push("/not-found"); // Redirect to 404 page if user or posts not found
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [username, router, cloudImage]);

  const handleReaction = async (postId: string) => {
    try {
      const userId = user?._id;
      if (!userId) {
        console.error("User ID is undefined");
        return;
      }

      const action = likedPosts.includes(postId) ? "unlike" : "like";
      const response = await axios.post(`/api/posts/react`, {
        postId,
        action,
        userId,
      });

      if (response.status === 200) {
        const updatedPost: Post = response.data; // Ensure response data is of type Post
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === updatedPost._id ? updatedPost : post
          )
        );
        setLikedPosts((prevLikedPosts) =>
          action === "like"
            ? [...prevLikedPosts, postId]
            : prevLikedPosts.filter((id) => id !== postId)
        );
      } else {
        console.error("Failed to react to post:", response.data.message);
      }
    } catch (error: any) {
      console.error("Error reacting to post:", error.message);
    }
  };

  // const handleReaction = async (postId: string) => {
  //   try {
  //    const userId = user?._id;
  //   if (!userId) {
  //     console.error("User ID is undefined");
  //      return;
  //    }

  //    const action = likedPosts.includes(postId) ? "unlike" : "like";
  //    const response = await axios.post(`/api/posts/react`, {
  //      postId,
  //     action,
  //      userId,
  //   });
  //    const updatedPost = response.data;

  //    if (response.status === 200) {
  //     setPosts((prevPosts) =>
  //       prevPosts.map((post) =>
  //         post._id === updatedPost._id ? updatedPost : post
  //       )
  //     );
  //     setLikedPosts((prevLikedPosts) =>
  //      action === "like"
  //       ? [...prevLikedPosts, postId]
  //       : prevLikedPosts.filter((id) => id !== postId)
  //    );
  //      console.log("my liked", likedPosts)
  //    } else {
  //     console.error("Failed to react to post:", response.data.message);
  //     }
  //   } catch (error: any) {
  //      console.error("Error reacting to post:", error.message);
  //   }
  //  };

  const handleShare = async (postId: string) => {
  try {
    // Logic to share post
    console.log(`Sharing post with ID ${postId}`);

    // Here you can implement share functionality using browser APIs or third-party libraries
    const shareUrl = `https://example.com/posts/${postId}`;
    const shareText = `Check out this post by ${user?.userName}: "${posts.find(p => p._id === postId)?.content}"`;

    if (navigator.share) {
      await navigator.share({
        title: 'Check out this post',
        text: shareText,
        url: shareUrl,
      });
      console.log('Shared successfully');
    } else {
      console.log('Web Share API not supported');
      // Fallback share options for browsers that do not support Web Share API
    }
  } catch (error) {
    console.error('Error sharing post:', error);
  }
};


  

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      {user ? (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8  mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <UserAvatarSection
                  isLoading={isLoading}
                  user={user}
                  handleFileSelect={handleFileSelect}
                />
              </div>
              <PostButton
                user={user}
                setPosts={setPosts}
                openCreatePostModal={openCreatePostModal}
                setOpenCreatePostModal={setOpenCreatePostModal}
                editSelectedPost={editSelectedPost}
                setEditSelectedPost={setEditSelectedPost}
                selectedPost={selectedPost}
                setSelectedPost={setSelectedPost}
              />

              <div className="mt-8 hidden md:flex flex-col">
                <UserProfileSection />
              </div>
            </div>
            <div className="md:col-span-2">
              <Post
                user={user}
                posts={posts}
                setPosts={setPosts}
                likedPosts={likedPosts}
                handleReaction={handleReaction}
                handleComment={handleComment}
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
        </div>
      ) : (
        <p className="text-lg text-red-600">User not found</p>
      )}
    </div>
  );
};

export default UserPage;
