// components/cookies/CloseIcon.tsx
/*import React from 'react';
import { IoMdClose } from 'react-icons/io';

const CloseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return <IoMdClose onClick={onClick} size={18} className="absolute top-2 right-3 cursor-pointer z-50 p-3 text-white bg-red-500" />;
};

export default CloseIcon;
*/

// components/cookies/CloseIcon.tsx
import React from 'react';
import { IoMdClose } from 'react-icons/io';

const CloseIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="absolute top-2 right-3 cursor-pointer z-50 p-3 bg-red-500">
      <IoMdClose onClick={onClick} size={18} className="text-white" />
    </div>
  );
};

export default CloseIcon;
 
