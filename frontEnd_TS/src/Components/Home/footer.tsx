import { Clock, MapPin, Phone } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">EliteEats</h3>
            <p className="text-gray-400 leading-relaxed">
              A culinary journey through exquisite flavors and premium
              ingredients.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-gray-400">
              <div>About Us</div>
              <div>Menu</div>
              <div>Locations</div>
              <div>Contact</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 91234 56789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Bandra, Mumbai, India</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>11:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © 2025 La Gourmet. All rights reserved. | Crafted with culinary
            excellence.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
