import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';


const AdminDashboardNew: React.FC = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [stats, setStats] = useState({
        properties: 0,
        applications: 0,
        showings: 0,
        maintenance: 0
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
            fetchStats();
        } catch (e) {
            console.error('Error parsing user data', e);
            navigate('/admin/login');
        }
    }, [navigate]);

    const fetchStats = async () => {
        try {
            const [properties, showings, applications] = await Promise.all([
                api.properties.getAll(),
                api.showings.getAll(),
                api.applications.getAll()
            ]);

            setStats({
                properties: properties.length,
                showings: showings.length,
                applications: applications.length,
                maintenance: 0 // Placeholder until we fetch maintenance requests
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };



    if (!user) return null;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Welcome, {user.name}</span>
                    <div className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0)}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Total Properties</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.properties}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Pending Applications</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.applications}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Upcoming Showings</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.showings}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                <p className="text-gray-500">No recent activity to display.</p>
            </div>
        </div>
    );
};

export default AdminDashboardNew;
