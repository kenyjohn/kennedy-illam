import { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import Calendar from 'react-calendar';
import { format, addDays, isBefore, startOfDay } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import { api } from '../services/api';

interface ShowingSchedulerProps {
    propertyId: string;
    propertyTitle: string;
    onClose: () => void;
}

interface TimeSlot {
    time: string;
    value: string;
    duration: number;
}

const ShowingScheduler: React.FC<ShowingSchedulerProps> = ({ propertyId, propertyTitle, onClose }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        notes: '',
    });

    // Fetch available slots when date is selected
    useEffect(() => {
        if (selectedDate) {
            fetchAvailableSlots(selectedDate);
        }
    }, [selectedDate]);

    const fetchAvailableSlots = async (date: Date) => {
        setLoading(true);
        setError('');
        try {
            const dateStr = format(date, 'yyyy-MM-dd');
            const slots = await api.showings.getAvailableSlots(propertyId, dateStr);
            setAvailableSlots(slots);
            setSelectedSlot(null);
        } catch (err: any) {
            setError(err.message || 'Failed to load available times');
            setAvailableSlots([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedSlot) return;

        setSubmitting(true);
        setError('');

        try {
            await api.showings.create({
                propertyId,
                ...formData,
                scheduledDate: format(selectedDate, 'yyyy-MM-dd'),
                scheduledTime: selectedSlot.time,
                duration: selectedSlot.duration,
            });

            setSuccess(true);
            setTimeout(() => onClose(), 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to schedule showing. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Disable past dates
    const tileDisabled = ({ date }: { date: Date }) => {
        return isBefore(startOfDay(date), startOfDay(new Date()));
    };

    if (success) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Showing Scheduled!</h3>
                    <p className="text-gray-600">
                        We'll send you a confirmation email shortly. See you on{' '}
                        {selectedDate && format(selectedDate, 'MMMM d, yyyy')} at {selectedSlot?.time}!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Schedule a Showing</h2>
                        <p className="text-gray-600 mt-1">{propertyTitle}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {error && (
                    <div className="mx-6 mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Calendar Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <CalendarIcon size={20} className="text-primary" />
                                <h3 className="font-semibold text-gray-900">Select a Date</h3>
                            </div>

                            <div className="showing-calendar">
                                <Calendar
                                    onChange={(value) => setSelectedDate(value as Date)}
                                    value={selectedDate}
                                    minDate={new Date()}
                                    maxDate={addDays(new Date(), 60)}
                                    tileDisabled={tileDisabled}
                                    className="border rounded-lg p-2"
                                />
                            </div>

                            {selectedDate && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-blue-900">
                                        Selected: <strong>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</strong>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Time Slots Section */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Clock size={20} className="text-primary" />
                                <h3 className="font-semibold text-gray-900">Select a Time</h3>
                            </div>

                            {!selectedDate ? (
                                <div className="text-center py-12 text-gray-500">
                                    <CalendarIcon size={48} className="mx-auto mb-3 opacity-30" />
                                    <p>Please select a date first</p>
                                </div>
                            ) : loading ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                    <p className="mt-3 text-gray-600">Loading available times...</p>
                                </div>
                            ) : availableSlots.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <Clock size={48} className="mx-auto mb-3 opacity-30" />
                                    <p>No available times for this date</p>
                                    <p className="text-sm mt-2">Please select another date</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                                    {availableSlots.map((slot) => (
                                        <button
                                            key={slot.value}
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`p-3 rounded-lg border-2 transition-all ${selectedSlot?.value === slot.value
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-gray-200 hover:border-primary hover:bg-blue-50'
                                                }`}
                                        >
                                            <div className="font-medium">{slot.time}</div>
                                            <div className="text-xs opacity-75">{slot.duration} min</div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Form */}
                    {selectedDate && selectedSlot && (
                        <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t">
                            <h3 className="font-semibold text-gray-900 mb-4">Your Information</h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                                    <input
                                        type="text"
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                        placeholder="Any special requests?"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Scheduling...' : 'Confirm Showing'}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowingScheduler;
