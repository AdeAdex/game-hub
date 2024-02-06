import React from 'react'

interface Props {
  title: string;
  className: string
}

const Headings: React.FC<Props> = ({title, className}) => {
  return (
    <>
     <h2 className={className}>{title}</h2>
    </>
  )
}

export default Headings
