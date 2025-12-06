import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FileText, Download, Calendar } from 'lucide-react';

interface Document {
    id: string;
    title: string;
    type: string;
    url: string;
    createdAt: string;
}

const TenantDocuments: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const tenant = JSON.parse(localStorage.getItem('tenantUser') || '{}');

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const data = await api.documents.getAll({ tenantId: tenant.id });
            setDocuments(data);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (url: string) => {
        // Construct absolute URL if it's a relative path
        const fullUrl = url.startsWith('http') ? url : `http://localhost:3000${url}`;
        window.open(fullUrl, '_blank');
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
                <p className="text-gray-600">Access your lease, rules, and other important documents.</p>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : documents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
                    <p className="text-gray-500">You don't have any documents yet.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {documents.map((doc) => (
                        <div key={doc.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <FileText className="text-blue-600" size={24} />
                                </div>
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600">
                                    {doc.type}
                                </span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{doc.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                <Calendar size={14} />
                                {new Date(doc.createdAt).toLocaleDateString()}
                            </div>
                            <button
                                onClick={() => handleDownload(doc.url)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors font-medium"
                            >
                                <Download size={18} />
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TenantDocuments;
