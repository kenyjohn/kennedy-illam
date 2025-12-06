import React from 'react';

const TenantDashboard: React.FC = () => {
    const tenant = JSON.parse(localStorage.getItem('tenantUser') || '{}');

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Current Balance</h3>
                    <p className="text-3xl font-bold text-gray-900">$0.00</p>
                    <p className="text-sm text-green-600 mt-2">No payment due</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Open Requests</h3>
                    <p className="text-3xl font-bold text-gray-900">0</p>
                    <p className="text-sm text-gray-500 mt-2">Maintenance tickets</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Lease Status</h3>
                    <p className="text-lg font-bold text-gray-900">Active</p>
                    <p className="text-sm text-gray-500 mt-2">Ends: {tenant.leaseEnd ? new Date(tenant.leaseEnd).toLocaleDateString() : 'N/A'}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
                <p className="text-gray-500">Welcome to your new tenant portal! Your recent payments and requests will appear here.</p>
            </div>
        </div>
    );
};

export default TenantDashboard;
