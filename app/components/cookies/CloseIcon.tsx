// components/cookies/CloseIcon.tsx

import React from 'react';
import { IoMdClose } from 'react-icons/io';

const CloseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="absolute top-2 right-3 cursor-pointer z-50 p-3 bg-gray-200 rounded-lg hover:bg-gray-200">
      <IoMdClose onClick={onClick} size={18} className="text-white" />
    </div>
  );
};

export default CloseIcon;
 
