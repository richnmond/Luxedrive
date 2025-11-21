import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white">LD</span>
              </div>
              <span className="text-white tracking-wider">LUXEDRIVE</span>
            </div>
            <p className="text-sm mb-4">
              Experience the future of luxury automotive excellence. Crafted for those who demand perfection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/models" className="hover:text-blue-400 transition-colors">
                  Our Models
                </Link>
              </li>
              <li>
                <Link to="/showroom" className="hover:text-blue-400 transition-colors">
                  Showrooms
                </Link>
              </li>
              <li>
                <Link to="/book-test-drive" className="hover:text-blue-400 transition-colors">
                  Book Test Drive
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/models?category=Electric" className="hover:text-blue-400 transition-colors">
                  Electric Vehicles
                </Link>
              </li>
              <li>
                <Link to="/models?category=Sports" className="hover:text-blue-400 transition-colors">
                  Sports Cars
                </Link>
              </li>
              <li>
                <Link to="/models?category=SUV" className="hover:text-blue-400 transition-colors">
                  SUVs
                </Link>
              </li>
              <li>
                <Link to="/models?category=Sedan" className="hover:text-blue-400 transition-colors">
                  Sedans
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>123 Luxury Avenue, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>info@luxedrive.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} LuxeDrive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
