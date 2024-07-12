import React from "react";
import Link from "next/link";

interface UserProfileSectionProps {
  email: string; // Define the prop type
}

const UserProfileSection: React.FC<UserProfileSectionProps> = ({ email }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg p-6 mb-8">
        <Link href="" className="text-xl font-semibold mb-4">
          Notifications
        </Link>
        {/* Add notifications component */}
      </div>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg p-6 mb-8">
        <Link
          href={`/settings?email=${email}`}
          className="text-xl font-semibold mb-4"
        >
          Settings
        </Link>
        {/* Add settings component */}
      </div>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg p-6 mb-8">
        <Link href="" className="text-xl font-semibold mb-4">
          Profile Summary
        </Link>
        {/* Add profile summary component */}
      </div>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg p-6 mb-8">
        <Link href="" className="text-xl font-semibold mb-4">
          Photos
        </Link>
        {/* Add photos component */}
      </div>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg p-6 mb-8">
        <Link href="" className="text-xl font-semibold mb-4">
          Albums
        </Link>
        {/* Add albums component */}
      </div>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg p-6 mb-8">
        <Link href="" className="text-xl font-semibold mb-4">
          Activities
        </Link>
        {/* Add activities component */}
      </div>
      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg shadow-lg p-6 mb-8">
        <Link href="" className="text-xl font-semibold mb-4">
          Friends
        </Link>
        {/* Add friends list component */}
      </div>
    </>
  );
};

export default UserProfileSection;
