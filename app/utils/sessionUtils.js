// sessionUtils.js
import { getSession } from "next-auth/react";

export async function getSessionData() {
  const session = await getSession();
  return session;
}
