"use client";

import { PrimaryButton } from "@/components/button/primary_button/primaryButton";
import { getRemainingHoursMinsSecs } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BookCallPanel = ({ dictionary, startDate, endDate }: { dictionary: any, startDate: Date, endDate: Date }) => {

    const intervalRef:any = useRef();

    const [displayOffer, setDisplayOffer] = useState(false);
    const [remaining, setRemaining] = useState({ days: "00", hours: "00", minutes: "00", seconds: "00" });

    useEffect(() => {
        setCountdown(startDate, endDate);

        let _startDate = startDate;
        intervalRef.current = setInterval(() => {
            const { days, hours, minutes, seconds } = setCountdown(_startDate, endDate);
            _startDate.setSeconds(_startDate.getSeconds() + 1);
            const _displayOffer = days > 0 || hours > 0 || minutes > 0 || seconds > 0
            setDisplayOffer(_displayOffer);
            if(!_displayOffer) {
                clearInterval(intervalRef.current);
            }
        }, 1000);

        return () => {
            if(intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, []);

    const setCountdown = (startDate: Date, endDate: Date) => {
        const { days, hours, minutes, seconds } = getRemainingHoursMinsSecs(startDate, endDate);
        setRemaining({
            days: days < 10 ? `0${days}`: days.toString(),
            hours: hours < 10 ? `0${hours}`: hours.toString(),
            minutes: minutes < 10 ? `0${minutes}`: minutes.toString(),
            seconds: 
                seconds === 60 ? "00" :
                seconds < 10 ? `0${seconds}`: seconds.toString(),
        });

        return { days, hours, minutes, seconds };
    }

    return (
        <article
            className={`xl:max-w-[1424px] xl:mt-[96px] 2xl:mt-[128px] xl:mx-auto flex md:h-auto xs:h-auto relative rounded-lg bg-black/80 flex-col xs:gap-0 p-6 pt-8 z-0 gap-6`}
        >
            <section className="relative flex flex-col items-center w-full justify-center text-center relative gap-1">
                
                {/* Offer banner */}
                {displayOffer &&
                <div className="animate-bounce flex items-center font-bold uppercase py-0.5 px-5 gap-1 bg-ab-yellow rounded-md -mt-10">
                    <h3 className="text-black">{dictionary.services.offer_tag.tittle}</h3>
                    <h3 className="text-white">{`${remaining.days}:${remaining.hours}:${remaining.minutes}:${remaining.seconds}`}</h3>
                </div>}

                <div className="flex flex-col pt-5 text-white">
                    <h2 className="text-3xl font-bold">
                        {dictionary.services.page_title}
                    </h2>
                    <h2 className="text-3xl font-bold">
                        {dictionary.services.page_title_2}
                    </h2>
                </div>

                <h4 className="capitalize">{dictionary.services.page_subtitle}</h4>
                <h4 className="capitalize font-bold">{dictionary.services.page_caption}</h4>

                <BookCallButton dictionary={dictionary} className="mt-3 flex px-8 py-1" />
            </section>
        </article>
    );
}

export const BookCallButton = ({ dictionary, className, backgroundClass }: { dictionary: any, className: string, backgroundClass?: string }) => {

    return (
        <PrimaryButton className={className} backgroundClass={backgroundClass}>
            <a href="https://calendly.com/contacto-aventurasbonitas/30min" target="_blank" rel="noopener noreferrer">
                {dictionary.services.page_title_cta_book_call}
            </a>
        </PrimaryButton>
    )
}