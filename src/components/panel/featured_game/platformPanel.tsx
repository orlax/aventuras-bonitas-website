"use client";

import { PlatformCard } from "@/components/cards/platformCard";
import { SimplePanel } from "../simple_panel/simplePanel";

export const PlatformPanel = ({
  dictionary,
  release_date,
  platforms,
}: {
  dictionary: any;
  release_date: string;
  platforms: {
    name: string;
    slug: string;
  }[];
}) => {
  return (
    <SimplePanel className="text-ab-black bg-gradient-to-br from-white to-ab-orange h-full !flex !flex-col justify-start">
      <div className="flex flex-col">
        <h4 className="text-sm">{`${dictionary?.release_date} ${release_date}`}</h4>
        <h2 className="text-2xl font-semibold text-pretty">
          {dictionary?.title}
        </h2>
      </div>
      <div className="flex gap-1 flex-wrap items-center w-full">
        {platforms?.map((platform, index) => (
          <PlatformCard
            key={`platform_${index}`}
            className="w-full"
            text={platform.name}
            Icon={
              <img
                className="h-3 w-auto"
                src={`/platforms/${platform.slug}.png`}
                alt={platform.name}
              />
            }
          />
        ))}
      </div>
    </SimplePanel>
  );
};
