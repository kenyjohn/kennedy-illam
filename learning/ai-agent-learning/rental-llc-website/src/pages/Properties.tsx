import PropertyCard from '../components/PropertyCard';

const Properties: React.FC = () => {
    // In a real app, this would come from an API or database
    const allProperties = [
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
        {
            id: '4',
            title: 'Seaside Villa',
            location: 'Coastal Area',
            price: '$4,500',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
            beds: 5,
            baths: 4,
            sqft: 3500,
        },
        {
            id: '5',
            title: 'Urban Loft',
            location: 'Arts District',
            price: '$2,100',
            image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
            beds: 1,
            baths: 1,
            sqft: 950,
        },
        {
            id: '6',
            title: 'Family Townhouse',
            location: 'North Hills',
            price: '$2,800',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
            beds: 3,
            baths: 2.5,
            sqft: 1800,
        },
    ];

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
                    {allProperties.map((property) => (
                        <PropertyCard key={property.id} {...property} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Properties;
