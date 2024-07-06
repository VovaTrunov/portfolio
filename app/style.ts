import styled from "styled-components";

export const Home = styled.main`
  width: 100%;
  min-height: 100vh;
  display: grid;
  gap: 1.25rem;
  padding: 1.25rem;

  @media (min-width: 1024px) {
    height: 100vh;
    height: 100dvh;

    grid-template-areas:
      "project1 project1 project1 project1 project1 project1 timeline timeline timeline techstack techstack techstack"
      "project1 project1 project1 project1 project1 project1 timeline timeline timeline techstack techstack techstack"
      "experience experience experience hero hero hero hero hero hero project2 project2 project2"
      "languages languages languages hero hero hero hero hero hero project2 project2 project2"
      "testimonials testimonials testimonials testimonials testimonials social location location location project2 project2 project2"
      "testimonials testimonials testimonials testimonials testimonials social contact contact contact project2 project2 project2";
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    grid-template-areas:
      "hero hero hero hero hero experience experience experience"
      "hero hero hero hero hero contact contact contact"
      "techstack techstack techstack techstack project2 project2 project2 project2"
      "techstack techstack techstack techstack project2 project2 project2 project2"
      "timeline timeline timeline social project2 project2 project2 project2"
      "timeline timeline timeline social project2 project2 project2 project2"
      "location location location testimonials testimonials testimonials testimonials testimonials"
      "languages languages languages testimonials testimonials testimonials testimonials testimonials"
      "project1 project1 project1 project1 project1 project1 project1 project1"
      "project1 project1 project1 project1 project1 project1 project1 project1"
      "project1 project1 project1 project1 project1 project1 project1 project1";
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(10, 100px);
  }

  @media (max-width: 639px) {
    grid-template-areas:
      "hero hero hero hero"
      "hero hero hero hero"
      "hero hero hero hero"
      "experience experience experience experience"
      "techstack techstack techstack techstack"
      "techstack techstack techstack techstack"
      "project2 project2 project2 project2"
      "project2 project2 project2 project2"
      "project2 project2 project2 project2"
      "project2 project2 project2 project2"
      "timeline timeline timeline social"
      "timeline timeline timeline social"
      "timeline timeline timeline social"
      "project1 project1 project1 project1"
      "project1 project1 project1 project1"
      "project1 project1 project1 project1"
      "project1 project1 project1 project1"
      "project1 project1 project1 project1"
      "location location location location"
      "languages languages languages languages"
      "testimonials testimonials testimonials testimonials"
      "testimonials testimonials testimonials testimonials"
      "testimonials testimonials testimonials testimonials"
      "testimonials testimonials testimonials testimonials";
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(22, 80px);
  }
`;