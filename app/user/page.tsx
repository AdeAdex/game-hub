import { users } from "@/app/data/userData";
import Link from "next/link";
import React from "react";

const Users = () => {
  const contents = users;
  return (
    <>
      <main>
      {contents.map((user) => (
          <Link
            key={user.id}
            // href={{
            //   pathname: `/user/${user.username}`,
            //   query: user,
            // }}
            href={`/user/${user.username}`}
          >
              <li key={user.id}>{user.name}</li>
          </Link>
        ))}
      </main>
    </>
  );
};

export default Users;
