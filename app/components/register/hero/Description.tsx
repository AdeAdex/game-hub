import React from "react";

interface Props {
  content: string;
}

const Description: React.FC<Props> = ({ content }) => {
  return (
    <>
      <div>{content}</div>
    </>
  );
};

export default Description;
