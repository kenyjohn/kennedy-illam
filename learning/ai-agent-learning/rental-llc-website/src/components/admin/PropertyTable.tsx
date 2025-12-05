import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Clock } from 'lucide-react';
import type { Property } from '../../types';

interface PropertyTableProps {
    properties: Property[];
    onEdit: (property: Property) => void;
    onDelete: (id: string) => void;
    onToggleStatus: (id: string, currentStatus: boolean) => void;
}

const PropertyTable: React.FC<PropertyTableProps> = ({
    properties,
    onEdit,
    onDelete,
    onToggleStatus,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {properties.map((property) => (
                            <tr key={property.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 flex-shrink-0">
                                            <img
                                                className="h-10 w-10 rounded-lg object-cover"
                                                src={property.imageUrls?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'}
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{property.title}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{property.address}</div>
                                    <div className="text-sm text-gray-500">{property.city}, {property.state} {property.zipCode}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{property.bedrooms} Beds • {property.bathrooms} Baths</div>
                                    <div className="text-sm text-gray-500">{property.sqft} sqft</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-primary">${property.price.toLocaleString()}/mo</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${property.available
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}
                                    >
                                        {property.available ? 'Available' : 'Rented'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/admin/properties/${property.id}/availability`}
                                                className="text-secondary hover:text-amber-700 inline-flex items-center gap-1"
                                            >
                                                <Clock size={16} />
                                                Availability
                                            </Link>
                                            <button
                                                onClick={() => onEdit(property)}
                                                className="text-primary hover:text-slate-700 inline-flex items-center gap-1"
                                            >
                                                <Edit size={16} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => onDelete(property.id)}
                                                className="text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => onToggleStatus(property.id, property.available)}
                                            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${property.available
                                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                        >
                                            {property.available ? 'Mark as Rented' : 'Mark as Available'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PropertyTable;
