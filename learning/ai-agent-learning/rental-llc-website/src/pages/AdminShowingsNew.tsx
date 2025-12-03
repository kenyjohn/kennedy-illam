import React from 'react';
import { Link } from 'react-router-dom';

const AdminShowingsNew: React.FC = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Admin Showings New (Minimal)</h1>
            <Link to="/admin/dashboard" className="text-blue-600">Back to Dashboard</Link>
        </div>
    );
};

export default AdminShowingsNew;
