// src/components/layout/Footer.jsx
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
          
          <div>
            <h4 className="font-semibold mb-2">Vijetha Digital</h4>
            <p>Flex Printing, Banners, Boards & More</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <p>support@vijethadigital.com</p>
            <p>+91 9459565555</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <p>About Us</p>
            <p>Privacy Policy</p>
            <p>Refund Policy</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Address</h4>
            <p>Red Hills, Hyderabad</p>
          </div>

        </div>
      </Container>
    </footer>
  );
};

export default Footer;
