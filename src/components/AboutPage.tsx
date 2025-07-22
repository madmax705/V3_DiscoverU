import { Target, Lightbulb, User } from "lucide-react";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About DiscoverU</h1>
                    <p className="text-xl text-gray-600">Empowering students to discover their passions through club involvement</p>
                </div>

                {/* Problem Statement Section */}
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Target className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-semibold text-gray-900">The Challenge</h2>
                    </div>
                    <div className="prose prose-lg text-gray-600">
                        <p>
                            Students, particularly new entrants such as ninth graders, often lack comprehensive information about the various clubs and extracurricular activities (ECAs) offered at SUIS GUBEI. This information gap can result in students missing opportunities to join clubs that align with their interests or passions.
                        </p>
                        <p className="mt-4">
                            Moreover, participation in clubs and ECAs plays a crucial role in personal development and can significantly enhance college applications. As the high school experience is unique and finite, club involvement can create lifetime milestones for students.
                        </p>
                    </div>
                </div>

                {/* Solution Section */}
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Lightbulb className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-semibold text-gray-900">Our Solution</h2>
                    </div>
                    <div className="prose prose-lg text-gray-600">
                        <p>
                            We've created DiscoverU, a digital platform that comprehensively catalogs all clubs (student-led and teacher-supervised) and ECAs available at our school. This platform serves as a central hub where students can:
                        </p>
                        <ul className="list-disc pl-6 mt-4 space-y-2">
                            <li>Browse all available clubs and activities</li>
                            <li>Learn about club missions and activities</li>
                            <li>Connect with club leaders</li>
                            <li>Track their club involvement</li>
                            <li>Discover new opportunities aligned with their interests</li>
                        </ul>
                    </div>
                </div>

                {/* Founder Section */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-semibold text-gray-900">Meet the Founder</h2>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                            {/* Add founder's image here */}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Max Wang</h3>
                            <p className="text-gray-600 mb-4">Founder & Lead Developer</p>
                            <div className="prose prose-lg text-gray-600">
                                <p>
                                    Max Wang is an 11th-grade student at SUIS Gubei and the founder & lead developer of the SUIS Gubei Club Gallery. Passionate about community and innovation, he built this platform to help every student—especially freshmen—easily discover and join clubs and ECAs that ignite their interests and create lasting memories.
                                </p>
                                <div className="mt-4">
                                    <a
                                        href="mailto:maxwang3016@gmail.com"
                                        className="text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        maxwang3016@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage; 