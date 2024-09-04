"use client";

import { ServiceButton } from "@/components/button/serviceButton";
import { NAVIGATION } from "@/lib";
import { BglessPanel } from "../bgless_panel/bglessPanel";
import { SimplePanel } from "../simple_panel/simplePanel";

export const ServicesPanel = ({
  dictionary,
  onClickService,
}: {
  dictionary: any;
  onClickService?: (serviceIndex: number) => void;
}) => {
  return (
    <SimplePanel className="md:block text-ab-black bg-gradient-to-br from-white to-ab-lilac">
      <BglessPanel
        final=""
        dictionary={dictionary}
        bullets={[]}
        title={dictionary?.title}
        description={dictionary?.description}
        pageAnchor={{
          id: NAVIGATION.SERVICES,
          text: dictionary?.page_anchor,
          url: `#${NAVIGATION.SERVICES}`,
        }}
        rightContent={
          <section className="grid md:grid-cols-2 xs:grid-cols-1 gap-2">
            {dictionary?.solutions?.map((solution: any, index: number) => (
              <ServiceButton
                key={`service_${index}`}
                title={solution?.title}
                description={solution?.description}
                Logo={
                  <img
                    className="h-auto w-[50px]"
                    src={`/services/${solution.id}.png`}
                    alt={solution.id}
                  />
                }
                className="transition-all duration-300"
                onClick={() => onClickService && onClickService(index)}
              />
            ))}
          </section>
        }
      />
    </SimplePanel>
  );
};
