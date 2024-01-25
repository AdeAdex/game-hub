"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import { UserDataType } from "@/app/types/user";


const UserPage: React.FC = () => {
  const searchParams = useSearchParams();

  const { id, name, username, email }: UserDataType = {
    id: searchParams.get("id"),
    name: searchParams.get("name"),
    username: searchParams.get("username"),
    email: searchParams.get("email"),
  };

  if (!username) {
    return <p>Invalid URL</p>;
  }

  return (
    <div className="flex flex-col">
      <h3>User Page</h3>
      <ul>
        <li>id: {id}</li>
        <li>name: {name}</li>
        <li>username: {username}</li>
        <li>email: {email}</li>
      </ul>
    </div>
  );
};

export default UserPage;
