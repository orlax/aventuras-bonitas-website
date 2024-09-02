import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "@/store/useModal";
import { ContentWrapper } from "@/components/container/page_wrapper/contentWrapper";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { useOutsideClick } from "@/hooks/useClickOutside";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
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
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

let timer: NodeJS.Timeout;

export const ImageModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [dismount, setDismount] = useState(true);

  const { isOpen, type, data, onClose } = useModal();
  const isModalOpen = isOpen && type === "image";
  const { images, imageIndex } = data;

  const [[page, direction], setPage] = useState([0, 0]);
  const [index, setIndex] = useState(imageIndex);

  const ref = useOutsideClick(() => onClose(), true);

  useEffect(() => {
    setIsMounted(isModalOpen);
    if (isModalOpen) {
      clearTimeout(timer);
      setDismount(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    setIndex(imageIndex);
  }, [imageIndex]);

  if (!isMounted && !isModalOpen) {
    timer = setTimeout(() => {
      if (!isModalOpen) {
        setDismount(true);
      }
    }, 1000);
  } else {
    if (dismount) {
      setDismount(false);
    }
  }

  if (dismount || !images) return <></>;

  const exitModalManual = () => {
    onClose();
  };

  const getImageIndex = (index: number) => {
    return ((index % images.length) + images.length) % images.length;
  };

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setIndex(getImageIndex(page + newDirection));
  };

  return (
    <motion.div
      className="backdrop-blur-sm absolute bg-ab-black-70 w-full h-full flex items-center justify-center z-30 bg-opacity-70"
      animate={{ top: isMounted ? 0 : -300, opacity: isMounted ? 1 : "0" }}
      initial={{ top: "-100%", opacity: 0 }}
    >
      <ContentWrapper className=" h-auto flex items-center gap-4 mx-auto max-w-[90%] w-full !p-0 !rounded-none">
        <div ref={ref} className="w-full h-full flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={page}
              src={images[index ?? 0].url}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              className="rounded-lg"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            />
          </AnimatePresence>
          <div
            className="absolute bgroup rounded-lg w-10 h-10 flex justify-center items-center select-none cursor-pointer font-bold z-20 next right-10 "
            onClick={() => paginate(1)}
          >
            <ArrowRightCircleIcon
              width={40}
              height={40}
              className="text-white group-hover:scale-125 transition-all duration-500"
            />
          </div>
          <div
            className="absolute group rounded-lg w-10 h-10 flex justify-center items-center select-none cursor-pointer font-bold z-20 prev left-10 "
            onClick={() => paginate(-1)}
          >
            <ArrowLeftCircleIcon
              width={40}
              height={40}
              className="text-white group-hover:scale-125 transition-all duration-500"
            />
          </div>
        </div>

        <button
          onClick={() => exitModalManual()}
          className="absolute top-32 right-32 z-30 "
        >
          <XCircleIcon className="text-white" width={35} height={35} />
        </button>
      </ContentWrapper>
    </motion.div>
  );
};
