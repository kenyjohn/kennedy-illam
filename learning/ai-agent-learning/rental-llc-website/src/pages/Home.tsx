import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

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

const Home: React.FC = () => {
    const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/api/properties')
            .then(res => res.json())
            .then(data => {
                // Show all properties on home page (you can limit this later)
                setFeaturedProperties(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load properties:', err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2306&q=80"
                        alt="Modern Interior"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 flex justify-center"
                    >
                        <img src="/logo-transparent.png" alt="Kennedy Illam Logo" className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl filter brightness-110" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        Welcome to <span className="text-secondary">Kennedy Illam</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 mb-8"
                    >
                        Discover premium rental properties tailored to your lifestyle.
                        Experience comfort, elegance, and convenience.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Link
                            to="/properties"
                            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-600 transition-colors duration-300"
                        >
                            View Properties
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Properties Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Featured Properties</h2>
                        <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            Explore our hand-picked selection of premium rentals available now.
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                            <p className="mt-4 text-gray-600">Loading properties...</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredProperties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        id={property.id}
                                        title={property.title}
                                        location={`${property.city}, ${property.state}`}
                                        price={`$${property.price.toLocaleString()}`}
                                        image={property.images[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'}
                                        beds={property.bedrooms}
                                        baths={property.bathrooms}
                                        sqft={property.sqft || 0}
                                    />
                                ))}
                            </div>

                            {featuredProperties.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500">No properties available at the moment.</p>
                                </div>
                            )}
                        </>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            to="/properties"
                            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
                        >
                            View All Listings
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-primary text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your New Home?</h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Contact us today to schedule a viewing or learn more about our available properties.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
