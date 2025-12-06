import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Filter, CheckCircle, AlertCircle, Clock, Calendar } from 'lucide-react';

interface MaintenanceRequest {
    id: string;
    category: string;
    priority: string;
    description: string;
    status: string;
    createdAt: string;
    adminNotes?: string;
    preferredAccessTimes?: string;
    tenant: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        unitNumber: string | null;
    };
    property: {
        title: string;
        address: string | null;
    };
}

const AdminMaintenance: React.FC = () => {
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('ALL');

    useEffect(() => {
        fetchRequests();
    }, [filterStatus]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const params: any = {};
            if (filterStatus !== 'ALL') params.status = filterStatus;
            const data = await api.maintenance.getAll(params);
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await api.maintenance.update(id, { status: newStatus });
            fetchRequests(); // Refresh list
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
                <div className="flex items-center gap-2">
                    <Filter size={20} className="text-gray-400" />
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="NEW">New</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : requests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <CheckCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No requests found</h3>
                    <p className="text-gray-500">There are no maintenance requests matching your filter.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {requests.map((request) => (
                        <div key={request.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                            {request.status}
                                        </span>
                                        <span className="text-sm text-gray-500 flex items-center gap-1">
                                            <Calendar size={14} />
                                            {new Date(request.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">{request.category} - {request.property.title}</h3>
                                    <p className="text-sm text-gray-500">
                                        Unit {request.tenant.unitNumber || 'N/A'} • {request.tenant.firstName} {request.tenant.lastName}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {request.priority === 'Emergency' && (
                                        <span className="flex items-center gap-1 text-red-600 text-sm font-bold">
                                            <AlertCircle size={16} />
                                            Emergency
                                        </span>
                                    )}
                                    <select
                                        value={request.status}
                                        onChange={(e) => handleStatusUpdate(request.id, e.target.value)}
                                        className="text-sm border border-gray-300 rounded-md p-1"
                                    >
                                        <option value="NEW">New</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <p className="text-gray-600 bg-slate-50 p-4 rounded-lg mb-4">{request.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    Preferred Access: {request.preferredAccessTimes || 'Anytime'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminMaintenance;
