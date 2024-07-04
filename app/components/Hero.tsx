import Image from "next/image";
import Box from "./Box";
import { Button } from "./ui/button";
import styled from "styled-components";

const CSSName = styled.h1`
  line-height: 1;
  
  @media (max-width: 1023px) {
    font-size: clamp(max(40px, 2vw), 7.25vw, 7.5vw);
  }

  @media (min-width: 1024px) {
    font-size: clamp(5vw, 5.75vw, 6vw);
  }
`;

const Hero: React.FC = () => {
  return (
    <Box
      id="hero"
      className="flex flex-col items-center justify-center p-8 text-center"
      style={{ gridArea: "hero" }}
    >
      <CSSName className="font-semibold uppercase mb-3 z-10 text-gradient-white">
        Volodymyr
        <br />
        Trunov
      </CSSName>
      <h4
        className="text-textGray font-medium"
        style={{ fontSize: "clamp(19px, 1.5vw, 2vw)" }}
      >
        Software Engineer & Creative Thinker
      </h4>
      <div className="flex justify-center items-center gap-3 mt-5 sm:hidden">
        <Button variant="primary">Contact</Button>
        <Button>Resumé</Button>
      </div>
      {/* <Image
        className="absolute left-1/2 top-0 w-auto h-full -translate-x-1/2"
        src="/logo-bg.svg"
        width={231.63}
        height={234}
        alt="Volodymyr Trunov Logo"
      /> */}
    </Box>
  );
};

export default Hero;
