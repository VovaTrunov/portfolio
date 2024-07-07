import AnimatedCard from "./AnimatedCard";
import { Button } from "./ui/button";

const Contact: React.FC = () => {
  return (
    <AnimatedCard
      id="contact"
      className="hidden sm:flex justify-center items-center gap-3"
    >
      <Button asChild variant="primary">
        <a href="mailto:iamvladimirtrunov@gmail.com" target="_blank">
          Contact
        </a>
      </Button>
      <Button asChild>
        <a
          href="https://s3.us-west-1.amazonaws.com/vtrunov.com/Volodymyr+Trunov+-+CV.pdf"
          target="_blank"
        >
          Resumé
        </a>
      </Button>
    </AnimatedCard>
  );
};

export default Contact;
