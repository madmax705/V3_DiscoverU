import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-sm border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600">DiscoverU</h3>
            <p className="text-gray-600">
              Connecting students with their passions
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a href="/clubs" className="text-gray-600 hover:text-blue-600">
                  Browse Clubs
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>SUIS Gubei Campus</li>
              <li>info@discoveru.edu</li>
              <li>+86 123 456 7890</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>© 2024 DiscoverU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
