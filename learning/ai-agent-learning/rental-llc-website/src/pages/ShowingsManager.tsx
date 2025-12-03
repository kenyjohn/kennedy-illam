import React from 'react';

const ShowingsManager: React.FC = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Showings Manager</h1>
            <p>This is the new showings manager component.</p>
            <a href="/admin/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</a>
        </div>
    );
};

export default ShowingsManager;
