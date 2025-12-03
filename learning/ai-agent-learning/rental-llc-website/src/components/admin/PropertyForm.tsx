import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import type { Property } from '../../types';

interface PropertyFormProps {
    formData: any;
    setFormData: (data: any) => void;
    onSubmit: (e: React.FormEvent) => void;
    onClose: () => void;
    editingProperty: Property | null;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
    formData,
    setFormData,
    onSubmit,
    onClose,
    editingProperty,
}) => {
    const addImageUrl = () => {
        setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] });
    };

    const removeImageUrl = (index: number) => {
        const newUrls = formData.imageUrls.filter((_: string, i: number) => i !== index);
        setFormData({ ...formData, imageUrls: newUrls });
    };

    const handleImageUrlChange = (index: number, value: string) => {
        const newUrls = [...formData.imageUrls];
        newUrls[index] = value;
        setFormData({ ...formData, imageUrls: newUrls });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {editingProperty ? 'Edit Property' : 'Add New Property'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={onSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                required
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                            <input
                                type="text"
                                required
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.state}
                                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.zip}
                                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price / Month</label>
                            <input
                                type="number"
                                required
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>
                            <input
                                type="number"
                                value={formData.sqft}
                                onChange={e => setFormData({ ...formData, sqft: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                            <input
                                type="number"
                                required
                                value={formData.bedrooms}
                                onChange={e => setFormData({ ...formData, bedrooms: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                            <input
                                type="number"
                                step="0.5"
                                required
                                value={formData.bathrooms}
                                onChange={e => setFormData({ ...formData, bathrooms: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                            <input
                                type="text"
                                value={formData.features}
                                onChange={e => setFormData({ ...formData, features: e.target.value })}
                                placeholder="e.g. Hardwood Floors, Central Air, Updated Kitchen"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                            <div className="space-y-3">
                                {formData.imageUrls.map((url: string, index: number) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={e => handleImageUrlChange(index, e.target.value)}
                                            placeholder="Image URL"
                                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                        {formData.imageUrls.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeImageUrl(index)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addImageUrl}
                                    className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium"
                                >
                                    <Plus size={20} />
                                    Add Another Image
                                </button>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.available}
                                    onChange={e => setFormData({ ...formData, available: e.target.checked })}
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <span className="text-gray-700">Available for Rent</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.petsAllowed}
                                    onChange={e => setFormData({ ...formData, petsAllowed: e.target.checked })}
                                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <span className="text-gray-700">Pets Allowed</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium"
                        >
                            {editingProperty ? 'Save Changes' : 'Add Property'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PropertyForm;
