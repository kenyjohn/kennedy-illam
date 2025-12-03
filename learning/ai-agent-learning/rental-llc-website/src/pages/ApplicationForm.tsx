import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';

const ApplicationForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        // Move-in Details
        desiredMoveInDate: '',
        leaseTerm: '12',
        numberOfOccupants: '1',
        hasPets: false,
        petDetails: '',
        // Employment
        employmentStatus: '',
        employer: '',
        jobTitle: '',
        monthlyIncome: '',
        // Rental History
        currentAddress: '',
        landlordName: '',
        landlordPhone: '',
        reasonForLeaving: '',
        // References
        reference1Name: '',
        reference1Phone: '',
        reference1Relationship: '',
        reference2Name: '',
        reference2Phone: '',
        reference2Relationship: '',
        // Additional
        additionalInfo: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    propertyId: id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit application');
            }

            setSuccess(true);
            setTimeout(() => navigate(`/properties/${id}`), 3000);
        } catch (err: any) {
            setError(err.message || 'Failed to submit application. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center"
                >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
                    <p className="text-gray-600 mb-4">
                        Thank you for applying. We'll review your application and get back to you soon.
                    </p>
                    <p className="text-sm text-gray-500">Redirecting you back to the property...</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate(`/properties/${id}`)}
                    className="inline-flex items-center text-primary hover:text-slate-700 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Property
                </button>

                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-primary mb-2">Rental Application</h1>
                        <p className="text-gray-600">
                            Please fill out this application completely. All information will be kept confidential.
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            * We do not collect SSN or bank account information online for your security.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                    <input
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Move-in Details */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Move-in Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Desired Move-in Date</label>
                                    <input
                                        type="date"
                                        value={formData.desiredMoveInDate}
                                        onChange={(e) => setFormData({ ...formData, desiredMoveInDate: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lease Term (months)</label>
                                    <select
                                        value={formData.leaseTerm}
                                        onChange={(e) => setFormData({ ...formData, leaseTerm: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="6">6 months</option>
                                        <option value="12">12 months</option>
                                        <option value="24">24 months</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Occupants</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.numberOfOccupants}
                                        onChange={(e) => setFormData({ ...formData, numberOfOccupants: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 mt-7">
                                        <input
                                            type="checkbox"
                                            checked={formData.hasPets}
                                            onChange={(e) => setFormData({ ...formData, hasPets: e.target.checked })}
                                            className="rounded"
                                        />
                                        <span className="text-sm font-medium text-gray-700">I have pets</span>
                                    </label>
                                </div>
                                {formData.hasPets && (
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pet Details (type, breed, weight)</label>
                                        <textarea
                                            value={formData.petDetails}
                                            onChange={(e) => setFormData({ ...formData, petDetails: e.target.value })}
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="e.g., Dog, Golden Retriever, 60 lbs"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Employment */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Employment Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Employment Status</label>
                                    <select
                                        value={formData.employmentStatus}
                                        onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    >
                                        <option value="">Select...</option>
                                        <option value="EMPLOYED">Employed</option>
                                        <option value="SELF_EMPLOYED">Self-Employed</option>
                                        <option value="RETIRED">Retired</option>
                                        <option value="STUDENT">Student</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Employer</label>
                                    <input
                                        type="text"
                                        value={formData.employer}
                                        onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                    <input
                                        type="text"
                                        value={formData.jobTitle}
                                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income</label>
                                    <input
                                        type="number"
                                        value={formData.monthlyIncome}
                                        onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        placeholder="5000"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Rental History */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Current Rental Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Address</label>
                                    <input
                                        type="text"
                                        value={formData.currentAddress}
                                        onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Landlord Name</label>
                                    <input
                                        type="text"
                                        value={formData.landlordName}
                                        onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Landlord Phone</label>
                                    <input
                                        type="tel"
                                        value={formData.landlordPhone}
                                        onChange={(e) => setFormData({ ...formData, landlordPhone: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Leaving</label>
                                    <input
                                        type="text"
                                        value={formData.reasonForLeaving}
                                        onChange={(e) => setFormData({ ...formData, reasonForLeaving: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* References */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">References</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Reference 1 Name</label>
                                        <input
                                            type="text"
                                            value={formData.reference1Name}
                                            onChange={(e) => setFormData({ ...formData, reference1Name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.reference1Phone}
                                            onChange={(e) => setFormData({ ...formData, reference1Phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                                        <input
                                            type="text"
                                            value={formData.reference1Relationship}
                                            onChange={(e) => setFormData({ ...formData, reference1Relationship: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Friend, Colleague, etc."
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Reference 2 Name</label>
                                        <input
                                            type="text"
                                            value={formData.reference2Name}
                                            onChange={(e) => setFormData({ ...formData, reference2Name: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input
                                            type="tel"
                                            value={formData.reference2Phone}
                                            onChange={(e) => setFormData({ ...formData, reference2Phone: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                                        <input
                                            type="text"
                                            value={formData.reference2Relationship}
                                            onChange={(e) => setFormData({ ...formData, reference2Relationship: e.target.value })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Friend, Colleague, etc."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b">Additional Information</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Is there anything else you'd like us to know?
                                </label>
                                <textarea
                                    value={formData.additionalInfo}
                                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Any additional information that might be helpful..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Submitting...' : 'Submit Application'}
                                <Send size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(`/properties/${id}`)}
                                className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplicationForm;
