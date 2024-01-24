"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

interface UserPageProps {
  id: string;
  name: string;
  username: string;
  email: string;
}

const UserPage: React.FC<UserPageProps> = () => {
  const params = useSearchParams();

  const user: UserPageProps = {
    id: params.get("id") || "",
    name: params.get("name") || "",
    username: params.get("username") || "",
    email: params.get("email") || "",
  };

  const username: string | null = params.get("username");

  // console.log("params", params);
  // console.log("user", user);
  // console.log("query_params", username);

  if (!username) {
    return <p>Invalid URL</p>;
  }

  return (
    <div className="flex flex-col">
      <h3>User Page</h3>
      <ul>
        <li>id: {user.id}</li>
        <li>name: {user.name}</li>
        <li>username: {user.username}</li>
        <li>email: {user.email}</li>
      </ul>
    </div>
  );
};

export default UserPage;
