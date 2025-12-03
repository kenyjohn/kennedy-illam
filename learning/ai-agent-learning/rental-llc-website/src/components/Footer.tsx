import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Info */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo-transparent.png" alt="Kennedy Illam Logo" className="h-10 w-auto bg-white rounded-full p-1" />
                            <h3 className="text-2xl font-bold text-secondary">Kennedy Illam</h3>
                        </div>
                        <p className="text-gray-300 mb-4">
                            Premium rental properties offering comfort, style, and convenience. Find your perfect home with us.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-300 hover:text-secondary transition-colors">Home</Link></li>
                            <li><Link to="/properties" className="text-gray-300 hover:text-secondary transition-colors">Properties</Link></li>
                            <li><Link to="/contact" className="text-gray-300 hover:text-secondary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link to="/privacy" className="text-gray-300 hover:text-secondary transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="text-gray-300 hover:text-secondary transition-colors">Terms of Service</Link></li>
                            <li><Link to="/fair-housing" className="text-gray-300 hover:text-secondary transition-colors">Fair Housing</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-300">
                                <Phone size={18} className="text-secondary" />
                                <span>(555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <Mail size={18} className="text-secondary" />
                                <span>info@kennedyillam.com</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-300">
                                <MapPin size={18} className="text-secondary" />
                                <span>123 Rental Ave, City, State</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Kennedy Illam. All rights reserved. | Equal Housing Opportunity</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
