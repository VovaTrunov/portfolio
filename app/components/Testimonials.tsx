"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import Box from "./Box";
import Image from "next/image";
import { TESTIMONIALS } from "@/config";
import { Fragment, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";

const Testimonials: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const carouselItems = TESTIMONIALS.map((testimonial) => (
    <Fragment key={testimonial.id}>
      <CarouselItem className="cursor-pointer group">
        <div className="flex gap-3 items-start">
          <Image
            src={testimonial.avatar}
            alt={testimonial.fullName}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <p className="text-[11px] text-textGray font-medium">
              {testimonial.position}
            </p>
            <h4 className="text-gradient-white font-semibold text-lg">
              {testimonial.fullName}
            </h4>
          </div>
        </div>
        <p className="text-sm text-textGray mt-3">{testimonial.message}</p>
      </CarouselItem>
    </Fragment>
  ));

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Box
      id="testimonials"
      className="p-4 flex flex-col justify-between"
      style={{ gridArea: "testimonials" }}
    >
      <Carousel setApi={setApi} plugins={[Autoplay({ delay: 6000 }), Fade()]}>
        <CarouselContent>{carouselItems}</CarouselContent>
      </Carousel>
      <div className="flex gap-3 items-center justify-between relative">
        {TESTIMONIALS.map((_, index) => (
          <div
            key={index}
            className="w-1/4 h-1 rounded-full cursor-pointer bg-white/10"
            onClick={() => api?.scrollTo(index)}
          />
        ))}
        <span
          className="w-[calc(25%-9px)] h-1 absolute rounded-full cursor-pointer bg-orange duration-500"
          style={{
            left: `calc(${current * 25}% + ${current * 3}px)`,
          }}
        />
      </div>
    </Box>
  );
};

export default Testimonials;
