import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

const Home: React.FC = () => {
    const featuredProperties = [
        {
            id: '1',
            title: 'Luxury Downtown Apartment',
            location: 'Downtown District',
            price: '$2,500',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
            beds: 2,
            baths: 2,
            sqft: 1200,
        },
        {
            id: '2',
            title: 'Modern Suburban Home',
            location: 'Green Valley',
            price: '$3,200',
            image: 'https://images.unsplash.com/photo-1600596542815-2250657d2f16?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
            beds: 4,
            baths: 3,
            sqft: 2400,
        },
        {
            id: '3',
            title: 'Cozy Garden Cottage',
            location: 'Westside',
            price: '$1,800',
            image: 'https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
            beds: 1,
            baths: 1,
            sqft: 800,
        },
    ];

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProperties.map((property) => (
                            <PropertyCard key={property.id} {...property} />
                        ))}
                    </div>

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
