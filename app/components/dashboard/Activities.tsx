import React, { useContext } from 'react';
import Image from 'next/image';
import { ActivityType, UserDataType } from '../../types/user';
import avatar from '@/public/images/robot.png';
import { ThemeContext } from '@/app/lib/ThemeContext'; // Import ThemeContext

interface ActivitiesProps {
  recentActivities: ActivityType[];
  userData: UserDataType | null;
  formatDateTime: (dateString: string) => string;
}

const Activities: React.FC<ActivitiesProps> = ({ recentActivities, userData, formatDateTime }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme

  return (
    <div className={`shadow-lg rounded-lg p-8 mt-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Recent Activities</h2>
      <ul className="space-y-4">
        {recentActivities && recentActivities.length > 0 ? (
          recentActivities.map((activity, index) => (
            <li key={index} className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="flex-shrink-0">
                <Image src={userData?.profilePicture || avatar} alt="Activity" width={24} height={24} className="rounded-full" />
              </div>
              <div className={`text-lg flex-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{activity.description}</div>
              <div className={`text-sm flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{formatDateTime(activity.date)}</div>
              <div className={`text-sm flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Device: {activity.device}</div>
              <div className={`text-sm flex-shrink-0 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Location: {activity.location}</div>
            </li>
          ))
        ) : (
          <div className={`text-gray-500 ${theme === 'dark' ? 'text-gray-400' : ''}`}>No recent activities found</div>
        )}
      </ul>
    </div>
  );
};

export default Activities;
