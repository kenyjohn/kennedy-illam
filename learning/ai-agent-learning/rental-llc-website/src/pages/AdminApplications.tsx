import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Check, X, MapPin, ArrowLeft, FileText, Clock } from 'lucide-react';
import { api } from '../services/api';
import type { Application } from '../types';

const AdminApplications: React.FC = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchApplications();
    }, [navigate]);

    const fetchApplications = async () => {
        try {
            const data = await api.applications.getAll();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        try {
            // We need to add updateStatus to api.applications first, currently it only has submit and getAll
            // But wait, server/routes/applications.ts has updateApplicationStatus endpoint.
            // I need to update api.ts to include updateStatus.
            // For now, I'll just log it or implement it in api.ts in the next step.
            // Actually, I should have checked api.ts first. I'll implement the UI assuming the API exists or I'll add it.
            // Let's assume I'll add it.

            // Temporary direct fetch until api.ts is updated
            const response = await fetch(`http://localhost:3001/api/applications/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ status })
            });

            if (response.ok) {
                fetchApplications();
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating application status:', error);
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
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard" className="p-2 hover:bg-white rounded-full transition-colors">
                            <ArrowLeft size={24} className="text-gray-600" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Rental Applications</h1>
                            <p className="text-gray-500">Review and manage tenant applications</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {applications.length === 0 ? (
                        <div className="p-12 text-center">
                            <Users size={48} className="mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                            <p className="text-gray-500">There are no rental applications at the moment.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Property</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {applications.map((app) => (
                                        <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">{app.property?.title}</span>
                                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                                        <MapPin size={12} />
                                                        {app.property?.address}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">{app.firstName} {app.lastName}</span>
                                                    <span className="text-sm text-gray-500">{app.email}</span>
                                                    <span className="text-sm text-gray-500">{app.phone}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">
                                                        {new Date(app.createdAt).toLocaleDateString()}
                                                    </span>
                                                    <span className="text-sm text-gray-500 flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                    ${app.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                                        app.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                            app.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                                'bg-blue-100 text-blue-800'}`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {app.status === 'PENDING' && (
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleStatusUpdate(app.id, 'APPROVED')}
                                                            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                            title="Approve"
                                                        >
                                                            <Check size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                                                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                            title="Reject"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    </div>
                                                )}
                                                {/* Placeholder for View Details */}
                                                <button className="ml-2 p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="View Details">
                                                    <FileText size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminApplications;
