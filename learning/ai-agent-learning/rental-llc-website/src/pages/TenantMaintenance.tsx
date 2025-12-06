import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Plus, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

interface MaintenanceRequest {
    id: string;
    category: string;
    priority: string;
    description: string;
    status: string;
    createdAt: string;
    adminNotes?: string;
}

const TenantMaintenance: React.FC = () => {
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const tenant = JSON.parse(localStorage.getItem('tenantUser') || '{}');

    const [formData, setFormData] = useState({
        category: 'General',
        priority: 'Low',
        description: '',
        preferredAccessTimes: ''
    });

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const data = await api.maintenance.getAll({ tenantId: tenant.id });
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.maintenance.create({
                ...formData,
                tenantId: tenant.id,
                propertyId: tenant.propertyId
            });
            setShowForm(false);
            setFormData({ category: 'General', priority: 'Low', description: '', preferredAccessTimes: '' });
            fetchRequests();
        } catch (error) {
            console.error('Error creating request:', error);
            alert('Failed to submit request');
        } finally {
            setSubmitting(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'NEW': return 'bg-blue-100 text-blue-800';
            case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'CANCELLED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    <Plus size={20} />
                    New Request
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Submit New Request</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="General">General</option>
                                    <option value="Plumbing">Plumbing</option>
                                    <option value="Electrical">Electrical</option>
                                    <option value="Appliance">Appliance</option>
                                    <option value="HVAC">HVAC</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Emergency">Emergency</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                rows={4}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Please describe the issue in detail..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Access Times</label>
                            <input
                                type="text"
                                value={formData.preferredAccessTimes}
                                onChange={(e) => setFormData({ ...formData, preferredAccessTimes: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="e.g., Weekdays after 5 PM"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={submitting}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : requests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <CheckCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No maintenance requests</h3>
                    <p className="text-gray-500">You haven't submitted any requests yet.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((request) => (
                        <div key={request.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                            {request.status}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(request.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{request.category}</h3>
                                </div>
                                {request.priority === 'Emergency' && (
                                    <span className="flex items-center gap-1 text-red-600 text-sm font-bold">
                                        <AlertCircle size={16} />
                                        Emergency
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-600 mb-4">{request.description}</p>
                            {request.adminNotes && (
                                <div className="bg-slate-50 p-4 rounded-lg text-sm">
                                    <span className="font-bold text-gray-900 block mb-1">Admin Response:</span>
                                    <p className="text-gray-600">{request.adminNotes}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TenantMaintenance;
