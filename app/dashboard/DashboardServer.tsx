import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const DashboardServer = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userResponse, setUserResponse] = useState<any>(null);

  useEffect(() => {
    const token = cookies.get("loginToken");

    const fetchData = async () => {
      try {
        if (!token) {
          console.error("Token is missing or invalid");
          return;
        }

        const response = await axios.get("/api/prompt/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        setUserResponse(response.data);

        if (response.data.success === false) {
          console.log(response);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div>
      <h2>User Data</h2>
      {userResponse && userResponse.data.success === true && (
        <div>
          <div>
            {/* Display server-specific user data here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardServer;
