import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">DiscoverU</h3>
            <p className="text-white/90">
              Connecting students with their passions
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-white/90 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/clubs" className="text-white/90 hover:text-white">
                  Browse Clubs
                </a>
              </li>
              <li>
                <a href="/about" className="text-white/90 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-white/90 hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-white/90">
              <li>SUIS Gubei Campus</li>
              <li>info@discoveru.edu</li>
              <li>+86 123 456 7890</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white/90 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/90 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white/90 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/90">
          <p>© 2024 DiscoverU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
