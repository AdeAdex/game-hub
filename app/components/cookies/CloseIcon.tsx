// components/cookies/CloseIcon.tsx
import React from 'react';
import { IoMdClose } from 'react-icons/io';

const CloseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <IoMdClose onClick={onClick} size={18} className="absolute top-2 right-3 cursor-pointer z-50 p-3" />;
};

export default CloseIcon;
