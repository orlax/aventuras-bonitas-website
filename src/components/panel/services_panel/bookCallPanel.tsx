"use client";

import { PrimaryButton } from "@/components/button/primary_button/primaryButton";
import { interpolateText } from "@/lib/utils";
import { useCallback, useState } from "react";

export const BookCallPanel = ({ dictionary, remainingDays }: { dictionary: any, remainingDays: number }) => {
    // TODO: integrate Calendly https://developer.calendly.com/getting-started

    const getRemainingDaysText = useCallback(() => {
        const text = remainingDays > 1 ?
            dictionary.services.offer_tag.remaining_time_plural
            :
            dictionary.services.offer_tag.remaining_time_singular;
        return interpolateText(text, {
            time_left: remainingDays.toString()
        })        
    }, [remainingDays]);

    return (
        <article
            className={`xl:max-w-[1424px] xl:mt-[96px] 2xl:mt-[128px] xl:mx-auto flex md:h-auto xs:h-auto relative rounded-lg bg-black/80 flex-col xs:gap-0 p-6 pt-8 z-0 gap-6`}
        >
            <section className="relative flex flex-col items-center w-full justify-center text-center relative gap-1">
                
                {/* Offer banner */}
                {remainingDays > 0 &&
                <div className="animate-bounce flex items-center font-bold uppercase py-0.5 px-5 gap-1 bg-ab-yellow rounded-md -mt-10">
                    <h3 className="text-black">{dictionary.services.offer_tag.tittle}</h3>
                    <h3>{getRemainingDaysText()}</h3>
                </div>}

                <div className="flex flex-col pt-5">
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
            {dictionary.services.page_title_cta_book_call}
        </PrimaryButton>
    )
}