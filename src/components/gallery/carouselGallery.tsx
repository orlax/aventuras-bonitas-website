"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { useModal } from "@/store/useModal";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

interface CarouselGalleryProps {
  images: { url: string; name: string }[];
}

export const CarousellGalery: React.FC<CarouselGalleryProps> = ({ images }) => {
  const [index, setIndex] = useState(images.length);
  const [[page, direction], setPage] = useState([index, 0]);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const { onOpen } = useModal();

  const getImageIndex = (index: number) => {
    return ((index % images.length) + images.length) % images.length;
  };

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
    const newImages = images.map((img) => ({
      url: img.url,
      name: img.name,
      id: 0,
    }));

    onOpen("image", { images: newImages, imageIndex: index });
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
          className="w-[24%] object-cover h-[auto] hover:scale-[1.02] cursor-pointer xs:hidden lg:block"
          style={{
            height: calculateHeight(dragOffset, "left"),
            width: calculateWidth(dragOffset, "left"),
          }}
          onClick={() => paginate(-1)}
        />
        <motion.img
          key={`root-page-${page}`}
          className="h-[auto] cursor-grab active:cursor-grabbing object-contain xs:w-[100%] lg:w-[49%]"
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
          className="w-[24%] object-cover h-[auto] hover:scale-[1.02] cursor-pointer xs:hidden lg:block"
          onClick={() => paginate(1)}
        />
      </AnimatePresence>

      <>
        <div
          className="absolute bgroup rounded-lg w-10 h-10 flex justify-center items-center select-none cursor-pointer font-bold z-20 next xs:right-10 md:right-20"
          onClick={() => paginate(1)}
        >
          <ArrowRightCircleIcon
            width={40}
            height={40}
            className="text-white group-hover:scale-125 transition-all duration-500 lg:hidden"
          />
        </div>
        <div
          className="absolute group rounded-lg w-10 h-10 flex justify-center items-center select-none cursor-pointer font-bold z-20 prev xs:left-10 md:left-20"
          onClick={() => paginate(-1)}
        >
          <ArrowLeftCircleIcon
            width={40}
            height={40}
            className="text-white group-hover:scale-125 transition-all duration-500 lg:hidden"
          />
        </div>
      </>
    </div>
  );
};
