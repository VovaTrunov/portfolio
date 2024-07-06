"use client";

import Testimonials from "@/app/components/Testimonials";
import Timeline from "@/app/components/Timeline";
import Experience from "@/app/components/Experience";
import Hero from "@/app/components/Hero";
import TechStack from "@/app/components/TechStack";
import Contact from "@/app/components/Contact";
import ProjectOne from "@/app/components/ProjectOne";
import Location from "@/app/components/Location";
import ProjectTwo from "@/app/components/ProjectTwo";
import Social from "@/app/components/Social";
import Languages from "@/app/components/Languages";

import * as CSS from "@/app/style";

export default function Main() {
  return (
    <CSS.Main>
      <Timeline />
      <Testimonials />
      <TechStack />
      <Experience />
      <Hero />
      <ProjectTwo />
      <Languages />
      <ProjectOne />
      <Location />
      <Social />
      <Contact />
    </CSS.Main>
  );
}
