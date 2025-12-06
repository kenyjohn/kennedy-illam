import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-slate-50">
            <AdminSidebar />
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
