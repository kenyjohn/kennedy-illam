import React from 'react';
import { Link } from 'react-router-dom';

const AdminShowings: React.FC = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Admin Showings</h1>
            <p>This is a safe, minimal version of the showings page.</p>
            <Link to="/admin/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</Link>
        </div>
    );
};

export default AdminShowings;
