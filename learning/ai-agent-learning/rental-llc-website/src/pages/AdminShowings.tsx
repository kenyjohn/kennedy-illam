import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Check, X, Clock, MapPin } from 'lucide-react';
import { api } from '../services/api';
import type { Showing } from '../types';

const AdminShowings: React.FC = () => {
    const navigate = useNavigate();
    const [showings, setShowings] = useState<Showing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchShowings();
    }, [navigate]);

    const fetchShowings = async () => {
        try {
            const data = await api.showings.getAll();
            setShowings(data);
        } catch (error) {
            console.error('Error fetching showings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: 'CONFIRMED' | 'CANCELLED') => {
        try {
            await api.showings.updateStatus(id, status);
            fetchShowings();
        } catch (error) {
            console.error('Error updating showing status:', error);
            alert('Failed to update status');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (

        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Showing Requests</h1>
                    <p className="text-gray-500">Manage property viewing appointments</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {showings.length === 0 ? (
                    <div className="p-12 text-center">
                        <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No showings found</h3>
                        <p className="text-gray-500">There are no showing requests at the moment.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tenant</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {showings.map((showing) => (
                                    <tr key={showing.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">{showing.property?.title}</span>
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <MapPin size={12} />
                                                    {showing.property?.address}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">{showing.name}</span>
                                                <span className="text-sm text-gray-500">{showing.email}</span>
                                                <span className="text-sm text-gray-500">{showing.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">
                                                    {new Date(showing.scheduledDate).toLocaleDateString()}
                                                </span>
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Clock size={12} />
                                                    {showing.scheduledTime} ({showing.duration} min)
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${showing.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                                    showing.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                        showing.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'}`}>
                                                {showing.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {showing.status === 'PENDING' && (
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(showing.id, 'CONFIRMED')}
                                                        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                        title="Confirm"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(showing.id, 'CANCELLED')}
                                                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminShowings;
