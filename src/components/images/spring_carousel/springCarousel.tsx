'use client'

import { ReactNode, useMemo, useRef, useState } from "react"
import loadable from "@loadable/component";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/24/solid";
import { useOutsideClick } from "@/hooks/useClickOutside";
export type SpringCarouselImage = {
    id: number | string,
    url: string,
    name: string,
}

const Carousel = loadable(() => import("react-spring-3d-carousel"))

export const SpringCarousel = ({
    slides,
    showNavigation,
}: {
    showNavigation?: boolean,
    slides: {
        content: ReactNode,
        url: string,
        name: string,
    }[]
}) => {
    const [currentFullSizeImage, setCurrentFullSizeImage] = useState<SpringCarouselImage | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const mappedSlides = useMemo(
        () => slides.map((slide, index) => ({...slide, key: `slide_${index}`, onClick: () => setCurrentSlide(index) })), 
    [slides]);

    const ref = useOutsideClick(() => setCurrentFullSizeImage(null));

    const showImage = (index: number) => {
        const selectedSlide = slides[index];
        setCurrentFullSizeImage({ url: selectedSlide.url, name: selectedSlide.name, id: 0 });
    }

    return (
        <>
            <div className="flex h-[250px] w-full items-center flex-col justify-center">
                <Carousel slides={mappedSlides} goToSlide={currentSlide} showNavigation={showNavigation} enableSwipe/>
                {slides.length > 0 &&
                <div className="-mt-16 z-20">
                    <MagnifyingGlassPlusIcon 
                        className='w-8 text-ab-black cursor-pointer'
                        onClick={() => showImage(currentSlide)}
                    />
                </div>}
            </div>
            {currentFullSizeImage &&
            <div
                className="backdrop-blur-sm absolute bg-ab-black-70 flex justify-center p-12 z-20 w-full h-full
                items-center
                top-0 left-0"
            >
                <div ref={ref} className="flex items-center justify-center">
                    <img 
                        src={currentFullSizeImage.url} 
                        alt={currentFullSizeImage.name} 
                        className='h-auto w-full' 
                    /> 
                </div>
            </div>}
        </>
    );
}
