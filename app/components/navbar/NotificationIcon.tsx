import React from "react";
import Link from "next/link";

interface NotificationIconProps {
  userName?: string;
  friendRequestCount?: number;
  messageCount?: number;
  hasPayments?: number;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
  userName,
  friendRequestCount = 0,
  messageCount = 0, // Default value for message count
  hasPayments = 0,
}) => {
  return (
    <Link
      className="flex relative cursor-pointer my-auto dark:hover:bg-gray-600 hover:bg-gray-200 rounded-md "
      href={`/${userName}/notifications?status=all`}
    >
      <div className="notification-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-6 h-6 text-gray-800 dark:text-white"
        >
          <path
            d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
          ></path>
        </svg>
        <div className={`${friendRequestCount > 0 || messageCount > 0 || hasPayments > 0 ? 'notification-point bg-green animate' : ''}`}></div>
      </div>
    </Link>
  );
};

export default NotificationIcon;
