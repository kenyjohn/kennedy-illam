import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Home, Calendar, Users, Wrench, LogOut, FileText } from 'lucide-react';

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    return (
        <aside className="w-64 bg-slate-900 text-white border-r border-slate-800 hidden md:flex flex-col fixed h-full z-10">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="font-bold text-white">R</span>
                    </div>
                    <span className="font-bold text-lg tracking-tight">Rental LLC</span>
                </div>

                <nav className="space-y-1">
                    <Link
                        to="/admin/dashboard"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive('/admin/dashboard')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <LayoutDashboard size={20} className={isActive('/admin/dashboard') ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link
                        to="/admin/properties"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive('/admin/properties')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Home size={20} className={isActive('/admin/properties') ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                        <span className="font-medium">Properties</span>
                    </Link>

                    <Link
                        to="/admin/showings"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive('/admin/showings')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Calendar size={20} className={isActive('/admin/showings') ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                        <span className="font-medium">Showings</span>
                    </Link>

                    <Link
                        to="/admin/applications"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive('/admin/applications')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Users size={20} className={isActive('/admin/applications') ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                        <span className="font-medium">Applications</span>
                    </Link>

                    <Link
                        to="/admin/maintenance"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive('/admin/maintenance')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <Wrench size={20} className={isActive('/admin/maintenance') ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                        <span className="font-medium">Maintenance</span>
                    </Link>

                    <Link
                        to="/admin/documents"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive('/admin/documents')
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        <FileText size={20} className={isActive('/admin/documents') ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                        <span className="font-medium">Documents</span>
                    </Link>
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 px-4 py-3 rounded-lg transition-all duration-200 w-full group"
                >
                    <LogOut size={20} className="group-hover:text-red-400" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
