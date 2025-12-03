import { useEffect, useState } from 'react';
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

const Properties: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/properties')
            .then(res => res.json())
            .then(data => {
                setProperties(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load properties');
                setLoading(false);
                console.error(err);
            });
    }, []);

    if (loading) {
        return (
            <div className="bg-slate-50 min-h-screen py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading properties...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-slate-50 min-h-screen py-12 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-primary mb-4">Available Properties</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Browse our complete collection of premium rental properties.
                        Find the perfect space that suits your needs and lifestyle.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map((property) => (
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

                {properties.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No properties available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Properties;
