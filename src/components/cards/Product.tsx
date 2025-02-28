"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Product = ({
  title,
  description,
  dev_to_company,
  small_img,
}: {
  title: string;
  description: string;
  dev_to_company: string;
  small_img: string;
}) => {
  console.log(small_img);
  return (
    <motion.div
      className="flex basis-[99%] lg:basis-[48.5%] min-h-40 bg-black/10 rounded-lg p-4 px-6 gap-2 shadow-lg hover:scale-[1.01] transition-all cursor-pointer flex-col-reverse"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1, transition: { duration: 1 } }}
    >
      <div className="flex w-full md:basis-1/2 flex-col gap-2">
        <div className="flex flex-1">
          <p className="text-xs text-center md:text-left">{description}</p>
        </div>
        <div className="flex basis-2/6 flex-col">
          <h3 className="text-[35px] tracking-tighter leading-9 margin-0 text-center md:text-left">
            {title}
          </h3>
          <h4 className="text-[20px] tracking-tighter leading-9 margin-0 text-center md:text-left">
            {dev_to_company}
          </h4>
        </div>
      </div>
      <div className="flex w-full md:basis-1/2 h-28 md:h-full">
        <div className="h-full w-full md:w-[90%] xl:w-full rounded-lg flex items-center justify-center">
          <Image
            src={small_img}
            alt={`${title} logo`}
            className="w-auto max-h-52 h-full object-cover rounded-xl"
            width={500}
            height={800}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Product;
