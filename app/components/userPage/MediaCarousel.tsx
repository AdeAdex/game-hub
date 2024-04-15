import React from "react";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";

interface MediaCarouselProps {
  images: string[]; // Array of image URLs
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({ images }) => {
  const slides = images.map((url) => (
    <Carousel.Slide key={url}>
      <Image src={url} alt="Images" />
    </Carousel.Slide>
  ));

  return <Carousel withIndicators>{slides}</Carousel>;
};

export default MediaCarousel;
