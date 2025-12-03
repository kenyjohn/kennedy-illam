import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, DollarSign, PawPrint, ArrowLeft, Calendar } from 'lucide-react';
import ShowingScheduler from '../components/ShowingScheduler';

interface Property {
    id: string;
    title: string;
    description: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    available: boolean;
    petsAllowed: boolean;
    features: string;
    images: { id: string; url: string }[];
}

const PropertyDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showScheduler, setShowScheduler] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/api/properties/${id}`)
            .then(res => res.json())
            .then(data => {
                setProperty(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load property details');
                setLoading(false);
                console.error(err);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading property details...</p>
                </div>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="bg-slate-50 min-h-screen py-12 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">{error || 'Property not found'}</p>
                    <Link to="/properties" className="mt-4 inline-block text-primary hover:underline">
                        Back to Properties
                    </Link>
                </div>
            </div>
        );
    }

    const features = property.features ? property.features.split(',') : [];

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link
                    to="/properties"
                    className="inline-flex items-center text-primary hover:text-slate-700 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Properties
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Image Gallery */}
                    <div className="grid md:grid-cols-2 gap-4 p-6">
                        <div className="space-y-4">
                            <motion.img
                                key={selectedImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                src={property.images[selectedImage]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'}
                                alt={property.title}
                                className="w-full h-96 object-cover rounded-lg"
                            />
                            {property.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2">
                                    {property.images.map((img, idx) => (
                                        <img
                                            key={img.id}
                                            src={img.url}
                                            alt={`${property.title} ${idx + 1}`}
                                            className={`w-full h-20 object-cover rounded cursor-pointer transition-all ${selectedImage === idx ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                                                }`}
                                            onClick={() => setSelectedImage(idx)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Property Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <MapPin size={20} className="mr-2" />
                                    <span>{property.address}, {property.city}, {property.state} {property.zip}</span>
                                </div>
                                <div className="flex items-center text-3xl font-bold text-primary">
                                    <DollarSign size={32} />
                                    {property.price.toLocaleString()}
                                    <span className="text-lg text-gray-500 ml-2">/month</span>
                                </div>
                            </div>

                            {/* Key Features */}
                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
                                <div className="flex items-center gap-2">
                                    <Bed size={24} className="text-secondary" />
                                    <div>
                                        <p className="text-sm text-gray-500">Bedrooms</p>
                                        <p className="font-semibold">{property.bedrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Bath size={24} className="text-secondary" />
                                    <div>
                                        <p className="text-sm text-gray-500">Bathrooms</p>
                                        <p className="font-semibold">{property.bathrooms}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Square size={24} className="text-secondary" />
                                    <div>
                                        <p className="text-sm text-gray-500">Square Feet</p>
                                        <p className="font-semibold">{property.sqft?.toLocaleString() || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PawPrint size={24} className="text-secondary" />
                                    <div>
                                        <p className="text-sm text-gray-500">Pets</p>
                                        <p className="font-semibold">{property.petsAllowed ? 'Allowed' : 'Not Allowed'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <h2 className="text-xl font-bold mb-2">Description</h2>
                                <p className="text-gray-600 leading-relaxed">{property.description}</p>
                            </div>

                            {/* Amenities */}
                            {features.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold mb-2">Amenities</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {features.map((feature, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-slate-100 text-gray-700 rounded-full text-sm"
                                            >
                                                {feature.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA Buttons */}
                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <button
                                    onClick={() => setShowScheduler(true)}
                                    className="bg-secondary text-white py-3 rounded-lg hover:bg-amber-600 transition-colors font-medium flex items-center justify-center gap-2"
                                >
                                    <Calendar size={20} />
                                    Schedule Showing
                                </button>
                                <Link
                                    to={`/properties/${property.id}/apply`}
                                    className="bg-primary text-white py-3 rounded-lg hover:bg-slate-700 transition-colors font-medium text-center"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Showing Scheduler Modal */}
                {showScheduler && (
                    <ShowingScheduler
                        propertyId={property.id}
                        propertyTitle={property.title}
                        onClose={() => setShowScheduler(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default PropertyDetail;
