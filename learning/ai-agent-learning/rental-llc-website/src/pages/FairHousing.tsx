const FairHousing: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-primary mb-6">Fair Housing Policy</h1>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
                        <p className="text-blue-900 font-medium">
                            Kennedy Illam is committed to compliance with all federal, state, and local fair housing laws.
                        </p>
                    </div>

                    <div className="space-y-6 text-gray-700">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Equal Housing Opportunity</h2>
                            <p>
                                We are pledged to the letter and spirit of U.S. policy for the achievement of equal
                                housing opportunity throughout the Nation. We encourage and support an affirmative
                                advertising and marketing program in which there are no barriers to obtaining housing
                                because of race, color, religion, sex, handicap, familial status, or national origin.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Protected Classes</h2>
                            <p className="mb-2">
                                Under the Fair Housing Act, it is illegal to discriminate against any person because of:
                            </p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li><strong>Race or Color</strong></li>
                                <li><strong>National Origin</strong></li>
                                <li><strong>Religion</strong></li>
                                <li><strong>Sex (including gender identity and sexual orientation)</strong></li>
                                <li><strong>Familial Status</strong> (families with children under 18, pregnant women)</li>
                                <li><strong>Disability</strong> (physical or mental impairment)</li>
                            </ul>
                            <p className="mt-3">
                                Additional state and local laws may provide protection for other classes not listed here.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Prohibited Practices</h2>
                            <p className="mb-2">In the rental of housing, it is illegal to:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Refuse to rent housing</li>
                                <li>Refuse to negotiate for housing</li>
                                <li>Make housing unavailable</li>
                                <li>Deny a dwelling</li>
                                <li>Set different terms, conditions, or privileges for rental of a dwelling</li>
                                <li>Provide different housing services or facilities</li>
                                <li>Falsely deny that housing is available for inspection, rental, or lease</li>
                                <li>Deny anyone access to or membership in a facility or service related to the rental of housing</li>
                                <li>Threaten, coerce, intimidate, or interfere with anyone exercising a fair housing right</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Reasonable Accommodations</h2>
                            <p>
                                We provide reasonable accommodations and modifications for persons with disabilities.
                                If you require an accommodation or modification to fully use and enjoy our properties,
                                please contact us to discuss your needs.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Our Commitment</h2>
                            <p>
                                Kennedy Illam evaluates all rental applications based on legitimate, non-discriminatory
                                criteria including:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 mt-2">
                                <li>Rental history and references</li>
                                <li>Employment and income verification</li>
                                <li>Credit history</li>
                                <li>Criminal background (in accordance with applicable laws)</li>
                            </ul>
                            <p className="mt-3">
                                All applicants are evaluated using the same criteria, regardless of protected class status.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900 mb-3">File a Complaint</h2>
                            <p className="mb-3">
                                If you believe you have experienced housing discrimination, you may file a complaint with:
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                                <div>
                                    <p className="font-semibold">U.S. Department of Housing and Urban Development (HUD)</p>
                                    <p>Office of Fair Housing and Equal Opportunity</p>
                                    <p>Phone: 1-800-669-9777 (Voice) / 1-800-927-9275 (TTY)</p>
                                    <p>Website: <a href="https://www.hud.gov/fairhousing" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.hud.gov/fairhousing</a></p>
                                </div>
                                <div>
                                    <p className="font-semibold">Or contact us directly:</p>
                                    <p>Email: <a href="mailto:fairhousing@kennedyillam.com" className="text-primary hover:underline">fairhousing@kennedyillam.com</a></p>
                                    <p>Phone: (555) 123-4567</p>
                                </div>
                            </div>
                        </section>

                        <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                            <div className="flex items-center justify-center mb-4">
                                <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
                                    <rect width="100" height="100" fill="#1e293b" />
                                    <path d="M50 20L20 45H30V75H45V55H55V75H70V45H80L50 20Z" fill="#f59e0b" />
                                    <text x="50" y="92" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">EQUAL HOUSING</text>
                                    <text x="50" y="98" textAnchor="middle" fill="white" fontSize="8">OPPORTUNITY</text>
                                </svg>
                            </div>
                            <p className="text-center text-gray-700 font-medium">
                                We are an Equal Housing Opportunity Provider
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FairHousing;
