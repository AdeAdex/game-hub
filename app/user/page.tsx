import { users } from "@/app/data/userData";
import Link from "next/link";
import React from "react";

const Users = () => {
  const contents = users;
  return (
    <>
      <main className="text-center py-5 w-full flex flex-col gap-4">
      {contents.map((user) => (
          <Link
          className="mx-auto w-[200px]"
            key={user.id}
            href={{
              pathname: `/user/${user.username}` + "_page",
              query: user,
            }}
          >
              <div className="text-center w-full bg-gray-100" key={user.id}>{user.name}</div>
          </Link>
        ))}
      </main>
    </>
  );
};

export default Users;
