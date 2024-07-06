"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/app/components/ui/carousel";
import Image from "next/image";
import { TESTIMONIALS } from "@/config";
import { Fragment, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import styled from "styled-components";
import AnimatedCard from "./AnimatedCard";

const CSSMessage = styled.p`
  line-height: 1.25;

  @media (max-width: 639px) {
    font-size: clamp(max(3.5vw, 1.25rem), 2.5vw, 2.5vw);
  }

  @media (min-width: 640px) and (max-width: 767px) {
    font-size: clamp(max(2.5vw, 1.25rem), 2.5vw, 2.5vw);
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: clamp(max(2.5vw, 1.5rem), 2.5vw, 2.5vw);
  }

  @media (min-width: 1024px) {
    font-size: clamp(1.5vw, 1.85vw, 1.85vw);
  }

  span {
    color: #ff7438;
    font-weight: 600;
  }
`;

const Testimonials: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const carouselItems = TESTIMONIALS.map((testimonial) => (
    <Fragment key={testimonial.id}>
      <CarouselItem className="group">
        <div className="flex gap-4 w-full items-center group">
          <div className="relative w-10 h-10 grayscale group-hover:grayscale-0 transition-all">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="rounded-full"
            />
            <div className="w-5 h-5 rounded-full overflow-hidden absolute -bottom-1 -right-1 z-10 object-fill">
              <Image
                src={testimonial.company_logo}
                alt={testimonial.name}
                fill
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[11px] text-textGray font-medium">
              {testimonial.position} at{" "}
              <a
                className="hover:underline hover:text-white/50 transition-all"
                href={testimonial.company_url}
                target="_blank"
              >
                {testimonial.company}
              </a>
            </p>
            <h4 className="text-gradient-white font-semibold text-lg">
              {testimonial.name}
            </h4>
          </div>
        </div>
        <CSSMessage className="text-white/50 italic mt-4">
          &quot;{testimonial.message}&quot;
        </CSSMessage>
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
    <AnimatedCard
      id="testimonials"
      className="card flex flex-col justify-center item-center p-8"
    >
      <Carousel setApi={setApi} plugins={[Autoplay({ delay: 7000 }), Fade()]}>
        <CarouselContent>{carouselItems}</CarouselContent>
      </Carousel>
      {/* <div className="relative flex gap-3 items-center justify-between">
        {TESTIMONIALS.map((_, index) => (
          <div
            key={index}
            className="w-1/4 h-1 rounded-full cursor-pointer bg-white/10"
            onClick={() => api?.scrollTo(index)}
          />
        ))}
        <span
          className="w-[calc(25%-9px)] h-1 absolute rounded-full cursor-pointer bg-white/50 duration-500"
          style={{
            left: `calc(${current * 25}% + ${current * 3}px)`,
          }}
        />
      </div> */}
    </AnimatedCard>
  );
};

export default Testimonials;
