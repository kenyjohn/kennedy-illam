import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, CreditCard, Wrench, FileText, LogOut, MessageSquare } from 'lucide-react';

const TenantLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const tenant = JSON.parse(localStorage.getItem('tenantUser') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('tenantToken');
        localStorage.removeItem('tenantUser');
        navigate('/tenant/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block fixed h-full z-10">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <img src="/logo-transparent.png" alt="Logo" className="h-8 w-auto" />
                        <span className="font-bold text-lg text-primary">Tenant Portal</span>
                    </div>

                    <div className="mb-6 px-4 py-3 bg-slate-50 rounded-lg border border-slate-100">
                        <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Welcome</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{tenant.firstName} {tenant.lastName}</p>
                    </div>

                    <nav className="space-y-1">
                        <Link
                            to="/tenant/dashboard"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/tenant/dashboard')
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:bg-slate-50'
                                }`}
                        >
                            <LayoutDashboard size={20} />
                            Dashboard
                        </Link>
                        <Link
                            to="/tenant/payments"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/tenant/payments')
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:bg-slate-50'
                                }`}
                        >
                            <CreditCard size={20} />
                            Payments
                        </Link>
                        <Link to="/tenant/maintenance" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/tenant/maintenance') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-slate-50'}`}>
                            <Wrench size={20} />
                            Maintenance
                        </Link>
                        <Link to="/tenant/documents" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/tenant/documents') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-slate-50'}`}>
                            <FileText size={20} />
                            Documents
                        </Link>
                        <Link
                            to="/tenant/messages"
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive('/tenant/messages')
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:bg-slate-50'
                                }`}
                        >
                            <MessageSquare size={20} />
                            Messages
                        </Link>
                    </nav>
                </div>

                <div className="absolute bottom-0 w-64 p-6 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors w-full px-4 py-2"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default TenantLayout;
