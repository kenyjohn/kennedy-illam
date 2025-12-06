import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FileText, Upload, Trash2, Download, User } from 'lucide-react';

interface Document {
    id: string;
    title: string;
    type: string;
    url: string;
    createdAt: string;
    tenant?: { firstName: string; lastName: string };
    property?: { title: string };
}

interface Tenant {
    id: string;
    firstName: string;
    lastName: string;
    unitNumber: string | null;
    property: { title: string };
}

const AdminDocuments: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [showUpload, setShowUpload] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        type: 'LEASE',
        tenantId: '',
        file: null as File | null
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [docsData, tenantsData] = await Promise.all([
                api.documents.getAll(),
                api.tenant.getAll()
            ]);
            setDocuments(docsData);
            setTenants(tenantsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, file: e.target.files[0] });
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.file || !formData.title || !formData.tenantId) {
            alert('Please fill all required fields');
            return;
        }

        setUploading(true);
        try {
            const data = new FormData();
            data.append('file', formData.file);
            data.append('title', formData.title);
            data.append('type', formData.type);
            data.append('tenantId', formData.tenantId);


            // We don't strictly need propertyId for the document if it's linked to tenant, 
            // but we could send it if the backend expects it. 
            // For now, let's assume backend handles it or it's optional.

            await api.documents.upload(data);

            setShowUpload(false);
            setFormData({ title: '', type: 'LEASE', tenantId: '', file: null });
            fetchData();
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Failed to upload document');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this document?')) return;
        try {
            await api.documents.delete(id);
            fetchData();
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Failed to delete document');
        }
    };

    const handleDownload = (url: string) => {
        const fullUrl = url.startsWith('http') ? url : `http://localhost:3000${url}`;
        window.open(fullUrl, '_blank');
    };

    return (

        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
                <button
                    onClick={() => setShowUpload(!showUpload)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    <Upload size={20} />
                    Upload Document
                </button>
            </div>

            {showUpload && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Upload New Document</h2>
                    <form onSubmit={handleUpload} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    placeholder="e.g., Lease Agreement 2024"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    <option value="LEASE">Lease</option>
                                    <option value="RULES">Rules & Regulations</option>
                                    <option value="NOTICE">Notice</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tenant</label>
                            <select
                                value={formData.tenantId}
                                onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            >
                                <option value="">Select Tenant</option>
                                {tenants.map(t => (
                                    <option key={t.id} value={t.id}>
                                        {t.firstName} {t.lastName} - {t.property.title} (Unit {t.unitNumber})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowUpload(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-slate-700 disabled:opacity-50"
                            >
                                {uploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : documents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
                    <p className="text-gray-500">Upload documents to share them with tenants.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 font-medium text-gray-600">Document</th>
                                <th className="p-4 font-medium text-gray-600">Type</th>
                                <th className="p-4 font-medium text-gray-600">Tenant</th>
                                <th className="p-4 font-medium text-gray-600">Date</th>
                                <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {documents.map((doc) => (
                                <tr key={doc.id} className="hover:bg-slate-50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 rounded text-blue-600">
                                                <FileText size={20} />
                                            </div>
                                            <span className="font-medium text-gray-900">{doc.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                                            {doc.type}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-600">
                                        {doc.tenant ? (
                                            <div className="flex items-center gap-2">
                                                <User size={16} />
                                                {doc.tenant.firstName} {doc.tenant.lastName}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">N/A</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-gray-500 text-sm">
                                        {new Date(doc.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleDownload(doc.url)}
                                                className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Download"
                                            >
                                                <Download size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(doc.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDocuments;
