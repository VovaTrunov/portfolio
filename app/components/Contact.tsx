import Box from "./Box";
import { Button } from "./ui/button";

const Contact: React.FC = () => {
  return (
    <Box
      id="contact"
      className="hidden sm:flex justify-center items-center gap-3"
      style={{ gridArea: "contact" }}
    >
      <Button variant="primary">Contact</Button>
      <Button>Resumé</Button>
    </Box>
  );
};

export default Contact;
