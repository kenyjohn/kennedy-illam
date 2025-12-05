import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, Home, Calendar, Users, Plus } from 'lucide-react';
import PropertyTable from '../components/admin/PropertyTable';
import PropertyForm from '../components/admin/PropertyForm';
import type { Property } from '../types';

const AdminProperties: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState<Property | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        price: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        available: true,
        petsAllowed: false,
        features: '',
        imageUrls: ['']
    });

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const userData = localStorage.getItem('adminUser');

        if (!token || !userData) {
            navigate('/admin/login');
            return;
        }

        try {
            setUser(JSON.parse(userData));
            fetchProperties();
        } catch (e) {
            console.error('Error parsing user data', e);
            navigate('/admin/login');
        }
    }, [navigate]);

    const fetchProperties = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/properties');
            const data = await response.json();
            // Map backend data to frontend type if needed, but they look similar
            // Backend returns 'zip' but frontend type expects 'zipCode'
            // Backend returns 'images' array of objects, frontend type expects 'imageUrls' string array
            const mappedData = data.map((p: any) => ({
                ...p,
                zipCode: p.zip,
                imageUrls: p.images?.map((img: any) => img.url) || [],
                features: p.features ? p.features.split(',').map((f: string) => f.trim()) : []
            }));
            setProperties(mappedData);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const handleEdit = (property: Property) => {
        setEditingProperty(property);
        setFormData({
            title: property.title,
            description: property.description,
            address: property.address,
            city: property.city,
            state: property.state,
            zip: property.zipCode,
            price: property.price.toString(),
            bedrooms: property.bedrooms.toString(),
            bathrooms: property.bathrooms.toString(),
            sqft: property.sqft.toString(),
            available: property.available,
            petsAllowed: false, // This seems missing in Property type but present in Form
            features: Array.isArray(property.features) ? property.features.join(', ') : property.features || '',
            imageUrls: property.imageUrls.length > 0 ? property.imageUrls : ['']
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this property?')) return;

        try {
            const response = await fetch(`http://localhost:3001/api/properties/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchProperties();
            } else {
                alert('Failed to delete property');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
            alert('Error deleting property');
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await fetch(`http://localhost:3001/api/properties/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ available: !currentStatus }),
            });

            if (response.ok) {
                fetchProperties();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editingProperty
                ? `http://localhost:3001/api/properties/${editingProperty.id}`
                : 'http://localhost:3001/api/properties';

            const method = editingProperty ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsFormOpen(false);
                fetchProperties();
                resetForm();
            } else {
                alert('Failed to save property');
            }
        } catch (error) {
            console.error('Error saving property:', error);
            alert('Error saving property');
        }
    };

    const resetForm = () => {
        setEditingProperty(null);
        setFormData({
            title: '',
            description: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            price: '',
            bedrooms: '',
            bathrooms: '',
            sqft: '',
            available: true,
            petsAllowed: false,
            features: '',
            imageUrls: ['']
        });
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white hidden md:block fixed h-full">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <img src="/logo-transparent.png" alt="Logo" className="h-8 w-auto" />
                        <span className="font-bold text-lg">Admin Panel</span>
                    </div>

                    <nav className="space-y-2">
                        <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg transition-colors">
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>
                        <Link to="/admin/properties" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg text-white">
                            <Home size={20} />
                            Properties
                        </Link>
                        <Link to="/admin/showings" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg transition-colors">
                            <Calendar size={20} />
                            Showings
                        </Link>
                        <Link to="/admin/applications" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg transition-colors">
                            <Users size={20} />
                            Applications
                        </Link>
                    </nav>
                </div>

                <div className="absolute bottom-0 w-64 p-6 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors w-full"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:ml-64">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
                    <button
                        onClick={() => {
                            resetForm();
                            setIsFormOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                    >
                        <Plus size={20} />
                        Add Property
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading properties...</p>
                    </div>
                ) : (
                    <PropertyTable
                        properties={properties}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onToggleStatus={handleToggleStatus}
                    />
                )}

                {isFormOpen && (
                    <PropertyForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        onClose={() => setIsFormOpen(false)}
                        editingProperty={editingProperty}
                    />
                )}
            </main>
        </div>
    );
};

export default AdminProperties;
