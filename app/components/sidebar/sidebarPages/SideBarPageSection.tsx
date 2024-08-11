import React from "react";

interface SideItem {
  name: string;
}

interface SideBarPageSectionProps {
  title: string;
}

const SideBarPageSection: React.FC<SideBarPageSectionProps> = ({ title }) => {
  return (
    <div>
      <h3
        className={`uppercase text-[16px] font-[700] py-[8px] dark:text-gray-300 text-[#434343]`}
      >
        {title}
      </h3>
      <div className="w-full text-[14px] capitalize leading-[28px]">
        <div className="w-full flex flex-wrap justify-between">
          {/* {tags?.map((tag, index) => {
              const link = tagLinks[tag.name] || `/games?tags=${tag.name}`;
              return (
                <Link
                  href={link}
                  className={`capitalize w-[50%] dark:text-gray-400 dark:hover:underline dark:hover:text-red-500 text-black hover:underline hover:text-red-500`}
                  key={index}
                >
                  {tag.name}
                </Link>
              );
            })} */}
        </div>
      </div>
    </div>
  );
};

export default SideBarPageSection;
