const TermsOfService: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-primary mb-6">Terms of Service</h1>
                    <p className="text-sm text-gray-500 mb-8">Last Updated: December 2024</p>

                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using this website, you accept and agree to be bound by these Terms of Service.
                                If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Use of Service</h2>
                            <p className="mb-2">You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Provide false or misleading information in rental applications</li>
                                <li>Violate any applicable local, state, or federal laws</li>
                                <li>Interfere with or disrupt the website or servers</li>
                                <li>Attempt to gain unauthorized access to any portion of the website</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Rental Applications</h2>
                            <p>
                                Submission of a rental application does not guarantee approval or lease agreement.
                                All applications are subject to verification, background checks, and credit checks.
                                Application fees, if any, are non-refundable.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Property Information</h2>
                            <p>
                                While we strive to provide accurate and up-to-date information about our properties,
                                we make no warranties about the completeness, reliability, or accuracy of this information.
                                Property availability, pricing, and features are subject to change without notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
                            <p>
                                All content on this website, including text, graphics, logos, images, and software,
                                is the property of Kennedy Illam or its content suppliers and is protected by
                                copyright and intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
                            <p>
                                Kennedy Illam shall not be liable for any indirect, incidental, special, consequential,
                                or punitive damages resulting from your use of or inability to use the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Modifications to Terms</h2>
                            <p>
                                We reserve the right to modify these Terms of Service at any time. Changes will be
                                effective immediately upon posting to the website. Your continued use of the website
                                after changes constitutes acceptance of the modified terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of the
                                state in which our properties are located, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Information</h2>
                            <p>
                                For questions about these Terms of Service, please contact us at:
                            </p>
                            <p className="mt-2">
                                Email: <a href="mailto:legal@kennedyillam.com" className="text-primary hover:underline">legal@kennedyillam.com</a><br />
                                Phone: (555) 123-4567
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
