const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-primary mb-6">Privacy Policy</h1>
                    <p className="text-sm text-gray-500 mb-8">Last Updated: December 2024</p>

                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
                            <p className="mb-2">We collect information that you provide directly to us, including:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Personal identification information (name, email, phone number)</li>
                                <li>Rental application details (employment, income, rental history)</li>
                                <li>Communication preferences and inquiry details</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
                            <p className="mb-2">We use the information we collect to:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Process rental applications and inquiries</li>
                                <li>Communicate with you about properties and services</li>
                                <li>Conduct background and credit checks (with your consent)</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Information Sharing</h2>
                            <p>
                                We do not sell, trade, or rent your personal information to third parties. We may share
                                your information with:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 mt-2">
                                <li>Service providers who assist in our operations (background check services, etc.)</li>
                                <li>Legal authorities when required by law</li>
                                <li>Previous landlords and employers for reference verification</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security</h2>
                            <p>
                                We implement appropriate security measures to protect your personal information from
                                unauthorized access, alteration, disclosure, or destruction. However, no method of
                                transmission over the Internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
                            <p className="mb-2">You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Access and review your personal information</li>
                                <li>Request corrections to inaccurate information</li>
                                <li>Request deletion of your information (subject to legal requirements)</li>
                                <li>Opt-out of marketing communications</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cookies and Tracking</h2>
                            <p>
                                We use cookies and similar tracking technologies to improve your browsing experience
                                and analyze site traffic. You can control cookie preferences through your browser settings.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy or our data practices, please contact us at:
                            </p>
                            <p className="mt-2">
                                Email: <a href="mailto:privacy@kennedyillam.com" className="text-primary hover:underline">privacy@kennedyillam.com</a><br />
                                Phone: (555) 123-4567
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
