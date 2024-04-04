// pages/reset-password.js
'use client'

import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
// import { resetPassword } from "../../api/forgot-password/route"; // Your API function to reset password

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof token === "string") {
        // await resetPassword(token, password);
        setSuccess(true);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (success) {
    return <p>Password reset successfully!</p>;
  }

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
