"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import avatar from "../../public/images/robot.png";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import Image from "next/image";
import Navbar from "../components/navbar/Navbar";
import LoadingSkeleton from "../components/userPage/LoadingSkeleton";
import ImageSkeleton from "../components/userPage/ImageSkeleton";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";


const LIKED_POSTS_KEY = "likedPosts";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePicture: string;
  bio: string;
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
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const router = useRouter();
  const { username } = params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState<string>("");
  const [newImage, setNewImage] = useState("");
  const [cloudImage, setCloudImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

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
        .post(endpoint, { newImage: reader.result, email: user?.email })
        .then((response) => {
          console.log(response.data.cloudLinkForProfilePicture);
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

        const storedLikedPosts = JSON.parse(localStorage.getItem(LIKED_POSTS_KEY) || "[]");
        setLikedPosts(storedLikedPosts);
      } catch (error) {
        console.error("Error fetching user or posts:", error);
        router.push("/not-found"); // Redirect to 404 page if user or posts not found
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

      const postIndex = posts.findIndex((post) => post._id === postId);
      if (postIndex === -1) {
        console.error("Post not found");
        return;
      }

      const isLiked = likedPosts.includes(postId); // Check if the post is liked by the user
      const action = isLiked ? "unlike" : "like";

      // Send reaction request to server
      const response = await axios.post(`/api/posts/react`, { postId, action, userId });
      const updatedPost = response.data;

      if (response.status === 200) {
        // Update posts state with the updated post
        setPosts((prevPosts) => {
          return prevPosts.map((post, index) => {
            if (index === postIndex) {
              return {
                ...post,
                likes: updatedPost.likes,
                likedBy: updatedPost.likedBy,
              };
            }
            return post;
          });
        });

        // Toggle the liked state for the post
        const updatedLikedPosts = isLiked
          ? likedPosts.filter((id) => id !== postId)
          : [...likedPosts, postId];
        setLikedPosts(updatedLikedPosts);

        // Store updated liked posts in local storage
        localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(updatedLikedPosts));
      } else {
        console.error("Failed to react to post:", response.data.message);
      }
    } catch (error: any) {
      console.error("Error reacting to post:", error.message);
    }
  };


  
  
  const handleComment = async (postId: string) => {
    // Logic to handle commenting
    console.log(`Commenting on post with ID ${postId}`);
  };

  const handleShare = async (postId: string) => {
    // Logic to handle sharing
    console.log(`Sharing post with ID ${postId}`);
  };

  const handlePost = async () => {
    try {
      if (!user) {
        console.error("User is null");
        return;
      }

      const response = await axios.post("/api/posts", {
        content: postContent,
        userId: user._id, // Assuming user ID is available in the user object
      });
      console.log(response);
      // Optionally, you can fetch the updated list of posts here and update the UI
    } catch (error: any) {
      console.error("Error creating post:", error);
      // Handle error
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
                <div className="text-center">
                  <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
                    {isLoading ? (
                      <ImageSkeleton /> // Render skeleton while image is loading
                    ) : user.profilePicture ? (
                      <Image
                        src={user.profilePicture}
                        alt="Profile Picture"
                        width={128}
                        height={128}
                        className="mx-auto rounded-full"
                      />
                    ) : (
                      <Image
                        src={avatar}
                        alt="Avatar"
                        width={128}
                        height={128}
                        className="mx-auto rounded-full"
                      />
                    )}
                  </label>
                  <input
                    type="file"
                    id="avatarInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                  <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="mt-1 text-lg text-gray-500">{user.userName}</p>
                </div>
                <div className="mt-8">
                  <div className="flex justify-between">
                    {/* <p className="text-lg font-semibold text-gray-700">
                      User ID: {user._id}
                    </p> */}
                  </div>
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold text-gray-700">
                      Email: {user.email}
                    </p>
                  </div>
                </div>
              </div>
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Write your post..."
                className="w-full h-32 px-3 py-2 mt-4 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
              />
              <button
                onClick={handlePost}
                className="w-full px-4 py-2 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Post
              </button>
              <div className="mt-8 hidden md:flex flex-col">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  {/* Add notifications component */}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Settings</h2>
                  {/* Add settings component */}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Profile Summary
                  </h2>
                  {/* Add profile summary component */}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Photos</h2>
                  {/* Add photos component */}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Albums</h2>
                  {/* Add albums component */}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Activities</h2>
                  {/* Add activities component */}
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Friends</h2>
                  {/* Add friends list component */}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="">
                {posts.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white mb-4 p-4 rounded-lg shadow-md "
                  >
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
                    <p className="text-gray-700">
                      <small className="text-[9px]">{post.content}</small>
                    </p>
                    <div className="flex justify-between items-center mt-2 px-4 text-gray-500">
                      <p>Total Reactions: {post.likedBy.length}</p>
                    </div>

                    <hr className="my-4 border-gray-300" />
                    <div className="flex justify-between items-center mt-2 px-4 text-gray-500">
                    <button
                        onClick={() => handleReaction(post._id)}
                        className="text-[8px]"
                      >
                        {likedPosts.includes(post._id) ? (
                          <>
                            <AiFillLike className="mx-auto text-blue-500" />{" "}
                            Unlike
                          </>
                        ) : (
                          <>
                            <AiOutlineLike className="mx-auto" size={12} />{" "}
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
