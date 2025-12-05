import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, Home, Calendar, Users } from 'lucide-react';
import { api } from '../services/api';

const AdminDashboardNew: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [stats, setStats] = useState({
        properties: 0,
        applications: 0,
        showings: 0
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
                showings: showings.filter(s => s.status === 'PENDING' || s.status === 'CONFIRMED').length,
                applications: applications.filter(a => a.status === 'PENDING').length
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
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
                        <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg text-white">
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>
                        <Link to="/admin/properties" className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/5 rounded-lg transition-colors">
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
            </main>
        </div>
    );
};

export default AdminDashboardNew;
