import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
    id: string;
    title: string;
    location: string;
    price: string;
    image: string;
    beds: number;
    baths: number;
    sqft: number;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
    id,
    title,
    location,
    price,
    image,
    beds,
    baths,
    sqft,
}) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <span className="font-bold text-primary">{price}</span>
                    <span className="text-xs text-gray-500">/month</span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
                        <div className="flex items-center text-gray-500 text-sm">
                            <MapPin size={16} className="mr-1" />
                            {location}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-gray-600 text-sm">
                    <div className="flex items-center gap-1">
                        <Bed size={18} className="text-secondary" />
                        <span>{beds} Beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Bath size={18} className="text-secondary" />
                        <span>{baths} Baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Square size={18} className="text-secondary" />
                        <span>{sqft} sqft</span>
                    </div>
                </div>

                <Link
                    to={`/properties/${id}`}
                    className="mt-6 block w-full text-center bg-primary text-white py-2 rounded-lg hover:bg-slate-700 transition-colors font-medium"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default PropertyCard;
