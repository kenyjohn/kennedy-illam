import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, Plus, Trash2, ArrowLeft } from 'lucide-react';
import type { Property, Availability } from '../types';
import { api } from '../services/api';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const AvailabilityManager: React.FC = () => {
    const { propertyId } = useParams<{ propertyId: string }>();
    const navigate = useNavigate();
    const [property, setProperty] = useState<Property | null>(null);
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [newAvailability, setNewAvailability] = useState({
        dayOfWeek: 1,
        startTime: '09:00',
        endTime: '17:00',
        slotDuration: 30,
    });

    const [deleteConfirmation, setDeleteConfirmation] = useState<{
        show: boolean;
        id: string | null;
    }>({
        show: false,
        id: null,
    });

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
            return;
        }

        if (propertyId) {
            fetchProperty();
            fetchAvailability();
        }
    }, [propertyId, navigate]);

    const fetchProperty = async () => {
        if (!propertyId) return;
        try {
            const data = await api.properties.getById(propertyId);
            setProperty(data);
        } catch (error) {
            console.error('Error fetching property:', error);
        }
    };

    const fetchAvailability = async () => {
        if (!propertyId) return;
        setLoading(true);
        try {
            const data = await api.availability.getByProperty(propertyId);
            setAvailabilities(data);
        } catch (error) {
            console.error('Error fetching availability:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAvailability = async () => {
        if (!propertyId) return;
        setSaving(true);
        try {
            await api.availability.create({
                ...newAvailability,
                propertyId,
                isActive: true
            });

            await fetchAvailability();
            setNewAvailability({
                dayOfWeek: 1,
                startTime: '09:00',
                endTime: '17:00',
                slotDuration: 30,
            });
        } catch (error) {
            console.error('Error adding availability:', error);
            alert('Failed to add availability');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        setDeleteConfirmation({ show: true, id });
    };

    const confirmDelete = async () => {
        if (!deleteConfirmation.id) return;

        try {
            await api.availability.delete(deleteConfirmation.id);
            await fetchAvailability();
            setDeleteConfirmation({ show: false, id: null });
        } catch (error) {
            console.error('Error deleting availability:', error);
            alert('Failed to delete availability');
        }
    };

    const cancelDelete = () => {
        setDeleteConfirmation({ show: false, id: null });
    };

    if (loading && !property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Dashboard
                </button>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Clock className="text-primary" size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Manage Availability</h1>
                            <p className="text-gray-500">
                                {property?.title} • {property?.address}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
                            <select
                                value={newAvailability.dayOfWeek}
                                onChange={(e) => setNewAvailability({ ...newAvailability, dayOfWeek: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {DAYS.map((day, index) => (
                                    <option key={index} value={index}>{day}</option>
                                ))}
                            </select>
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                            <input
                                type="time"
                                value={newAvailability.startTime}
                                onChange={(e) => setNewAvailability({ ...newAvailability, startTime: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                            <input
                                type="time"
                                value={newAvailability.endTime}
                                onChange={(e) => setNewAvailability({ ...newAvailability, endTime: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Slot Duration</label>
                            <select
                                value={newAvailability.slotDuration}
                                onChange={(e) => setNewAvailability({ ...newAvailability, slotDuration: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value={15}>15 mins</option>
                                <option value={30}>30 mins</option>
                                <option value={45}>45 mins</option>
                                <option value={60}>1 hour</option>
                            </select>
                        </div>
                        <div className="md:col-span-1">
                            <button
                                onClick={handleAddAvailability}
                                disabled={saving}
                                className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                            >
                                <Plus size={20} />
                                {saving ? 'Adding...' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Current Schedule</h2>
                    </div>
                    {availabilities.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No availability slots configured yet. Add one above to get started.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {availabilities
                                .sort((a, b) => a.dayOfWeek - b.dayOfWeek || a.startTime.localeCompare(b.startTime))
                                .map((avail) => (
                                    <div key={avail.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-24 font-medium text-gray-900">
                                                {DAYS[avail.dayOfWeek]}
                                            </div>
                                            <div className="text-gray-600">
                                                {new Date(`2000-01-01T${avail.startTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                                {' - '}
                                                {new Date(`2000-01-01T${avail.endTime}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                            </div>
                                            <div className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                                                {avail.slotDuration} min slots
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(e, avail.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Remove availability"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>

                {/* Quick Setup Guide */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">💡 Quick Setup Guide</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Set the days and times when showings can be scheduled</li>
                        <li>• Slot duration determines how long each showing appointment lasts</li>
                        <li>• Toggle "Active" to temporarily disable availability without deleting</li>
                        <li>• Tenants will only see available time slots that aren't already booked</li>
                    </ul>
                </div>

                {/* Delete Confirmation Modal */}
                {deleteConfirmation.show && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Confirm Delete</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this availability? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={cancelDelete}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailabilityManager;
