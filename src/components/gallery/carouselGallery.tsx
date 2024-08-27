"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { SpringCarouselImage } from "@/components/images/spring_carousel/springCarousel";
import { useOutsideClick } from "@/hooks/useClickOutside";
import Image from "next/image";

interface CarouselGalleryProps {
  images: { url: string; name: string }[];
}

export const CarousellGalery: React.FC<CarouselGalleryProps> = ({ images }) => {
  const [index, setIndex] = useState(images.length);
  const [[page, direction], setPage] = useState([index, 0]);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [currentFullSizeImage, setCurrentFullSizeImage] =
    useState<SpringCarouselImage | null>(null);

  const getImageIndex = (index: number) => {
    return ((index % images.length) + images.length) % images.length;
  };

  const ref = useOutsideClick(() => setCurrentFullSizeImage(null));

  const imageIndex = getImageIndex(page);
  const leftIndex = getImageIndex(page - 1);
  const rightIndex = getImageIndex(page + 1);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 100 : -100,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 100 : -100,
        opacity: 0,
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setIndex(getImageIndex(page + newDirection));
  };

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    { offset }: PanInfo
  ) => {
    setDragging(true);
    setDragOffset(offset.x);
  };

  const calculateHeight = (offset: number, direction: "left" | "right") => {
    const normalHeight = 100;
    let normalizedOffset = Math.abs(Math.trunc(offset)) - 10;
    if (normalizedOffset > 100) {
      normalizedOffset = 99;
    } else if (normalizedOffset <= 30) {
      normalizedOffset = 30;
    }

    if (direction === "left") {
      if (offset < 0) {
        return dragging
          ? normalHeight - normalizedOffset <= 30
            ? 30
            : normalHeight - normalizedOffset
          : normalHeight;
      }
      return dragging ? normalHeight + normalizedOffset : normalHeight;
    }

    if (offset < 0) {
      return dragging ? normalHeight + normalizedOffset : normalHeight;
    }
    return dragging ? normalHeight - normalizedOffset : normalHeight;
  };

  const calculateWidth = (offset: number, direction: "left" | "right") => {
    const normalWidth = "24%";
    let normalizedOffset = Math.abs(Math.trunc(offset)) / 10;
    if (normalizedOffset >= 25) {
      normalizedOffset = 24;
    }

    if (direction === "left") {
      if (offset < 0) {
        return dragging
          ? `calc(${normalWidth} - ${normalizedOffset}%)`
          : normalWidth;
      }
      return dragging
        ? `calc(${normalWidth} + ${normalizedOffset}%)`
        : normalWidth;
    }

    if (offset < 0) {
      return dragging
        ? `calc(${normalWidth} + ${normalizedOffset}%)`
        : normalWidth;
    }
    return dragging
      ? `calc(${normalWidth} - ${normalizedOffset}%)`
      : normalWidth;
  };

  const showImage = (index: number) => {
    const selectedSlide = images[index];
    setCurrentFullSizeImage({
      url: selectedSlide.url,
      name: selectedSlide.name,
      id: 0,
    });
  };

  return (
    <div className="flex flex-row gap-2 min-h-[232px] h-full items-center w-full">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={`left-page-${page}`}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { opacity: { delay: 0.2 } } }}
          src={images[leftIndex].url}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          alt={images[leftIndex].name}
          className="w-[24%] object-cover h-[auto] hover:scale-[1.02] cursor-pointer"
          style={{
            height: calculateHeight(dragOffset, "left"),
            width: calculateWidth(dragOffset, "left"),
          }}
          onClick={() => paginate(-1)}
        />
        <motion.img
          key={`root-page-${page}`}
          className="w-[49%] h-[auto] cursor-grab active:cursor-grabbing object-contain"
          src={images[imageIndex].url}
          alt={images[imageIndex].name}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDragStart={() => setDragging(true)}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            } else {
            }
            setDragging(false);
            setDragOffset(0);
          }}
          onDrag={handleDrag}
          onClick={() => {
            if (!dragging) {
              showImage(imageIndex);
            }
          }}
        />
        <motion.img
          key={`right-page-${page}`}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={images[rightIndex].url}
          alt={images[rightIndex].name}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          style={{
            height: calculateHeight(dragOffset, "right"),
            width: calculateWidth(dragOffset, "right"),
          }}
          className="w-[24%] object-cover h-[auto] hover:scale-[1.02] cursor-pointer"
          onClick={() => paginate(1)}
        />

        {currentFullSizeImage && (
          <motion.div
            className="backdrop-blur-sm absolute bg-ab-black-70 flex justify-center p-12 z-20 w-full h-full
                items-center
                top-0 left-0"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.2, opacity: 0 }}
          >
            <div
              ref={ref}
              className="flex items-center justify-center w-[800px] h-[400px] mx-auto"
            >
              <Image
                src={currentFullSizeImage.url}
                alt={currentFullSizeImage.name}
                className="h-full w-full"
                width={2000}
                height={1600}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
