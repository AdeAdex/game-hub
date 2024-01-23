// "use client"
// import React from 'react';
// import { useRouter } from 'next/router';

// interface UserPageProps {
//   user: {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//   };
// }

// const UserPage: React.FC<UserPageProps> = (params) => {
//   const router = useRouter();
//   const user  = router.query;

//   return (
//     <div className='flex'>
//       <h3>User Page</h3>
//       <ul>
//         <li>id: {user.id}</li>
//         <li>name: {user.name}</li>
//         <li>username: {user.username}</li>
//         <li>email: {user.email}</li>
//       </ul>
//     </div>
//   );
// };

// export default UserPage;

"use client";
import React from "react";
import { users } from "@/app/data/userData";

interface UserPageProps {
  params: {
    username: string;
  };
}

const UserPage: React.FC<UserPageProps> = ({ params }) => {
  const username = params.username;
  console.log(username);

  const user = users.find((u) => u.username === username);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="">
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
