// src/components/layout/Footer.jsx
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

          <div>
            <h4 className="font-semibold mb-2">
              Vijetha Digital
            </h4>
            <p className="text-gray-300">
              Professional printing solutions for businesses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Products</h4>
            <p>Flex Banners</p>
            <p>Vinyl Prints</p>
            <p>LED Boards</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <p>support@vijethadigital.com</p>
            <p>+91 94595 65555</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Address</h4>
            <p>Hyderabad, Telangana</p>
          </div>

        </div>
      </Container>
    </footer>
  );
}
