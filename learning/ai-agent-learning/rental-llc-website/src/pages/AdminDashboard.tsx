import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import PropertyTable from '../components/admin/PropertyTable';
import PropertyForm from '../components/admin/PropertyForm';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState<any[]>([]);

    useEffect(() => {
        const loadProperties = async () => {
            try {
                console.log('Fetching properties...');
                const data = await api.properties.getAll();
                console.log('Properties fetched:', data);
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        loadProperties();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard (Form Test)</h1>
            <p className="mb-4">Properties loaded: {properties.length}</p>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Add Property Form</h2>
                <PropertyForm
                    onSubmit={(data) => console.log('Submit', data)}
                />
            </div>

            <PropertyTable
                properties={properties}
                onEdit={(property) => console.log('Edit', property)}
                onDelete={(id) => console.log('Delete', id)}
                onToggleStatus={(id, status) => console.log('Toggle', id, status)}
            />

            <button
                onClick={() => navigate('/admin/login')}
                className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
                Logout
            </button>
        </div>
    );
};

export default AdminDashboard;
