// components/cookies/CloseIcon.tsx

import React from 'react';
import { IoMdClose } from 'react-icons/io';

const CloseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="absolute top-1 right-1 cursor-pointer z-50 px-3 py-2 rounded-lg">
      <IoMdClose onClick={onClick} size={18} className="text-white hover:text-red-500" />
    </div>
  );
};

export default CloseIcon;
 
