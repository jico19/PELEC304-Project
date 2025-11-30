import { CheckCircle, Search, DollarSign, Home, Calendar, User } from "lucide-react";
import NavBar from "src/components/NavBar";
import Footer from "src/components/Footer";
import { useNavigate } from "react-router-dom";


const About = () => {
    const navigate = useNavigate()


    const features = [
        { icon: CheckCircle, title: "Verified Listings", desc: "Every boarding house is verified for your safety and peace of mind." },
        { icon: Search, title: "Easy Search", desc: "Find your perfect room with our intuitive search and filter system." },
        { icon: DollarSign, title: "Budget Friendly", desc: "Discover affordable options that fit your budget without compromise." },
        { icon: Home, title: "Feel at Home", desc: "Comfortable, welcoming spaces designed for students and professionals." },
    ];

    const steps = [
        { icon: Search, title: "Browse & Search", desc: "Explore verified boarding houses across Lucena with easy filters." },
        { icon: User, title: "Find Your Match", desc: "Compare options, read reviews, and find the perfect fit for you." },
        { icon: Calendar, title: "Book & Move In", desc: "Connect with owners, book your room, and settle into your new home." },
    ];

    return (
        <div className="w-full flex flex-col bg-gray-50">
            <NavBar />
            <main className="flex-1 px-6 py-24 max-w-7xl mx-auto">
                {/* Hero */}
                <section className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-indigo-600">LucenaBNB</span> Your Home Away From Home
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl">
                        Find your perfect boarding house in Lucena. Affordable, verified, and hassle-free.
                    </p>
                </section>

                {/* Why Choose Us */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">Why Choose LucenaBNB?</h2>
                    <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
                        We make finding your perfect boarding house simple, safe, and stress-free.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                                <feature.icon className="w-12 h-12 text-indigo-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2 text-slate-800">{feature.title}</h3>
                                <p className="text-gray-500">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Steps */}
                <section className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-4 text-slate-900">How It Works</h2>
                    <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
                        Finding your perfect boarding house is simple in three steps
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
                                <step.icon className="w-12 h-12 text-green-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2 text-slate-800">{step.title}</h3>
                                <p className="text-gray-500">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center py-20 bg-indigo-50 rounded-lg">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-800">Ready to Find Your Perfect Home?</h2>
                    <p className="text-gray-700 mb-8 max-w-xl mx-auto">
                        Join hundreds of students and professionals who found their ideal boarding house through LucenaBNB.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button 
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-500 transition"
                            onClick={() => navigate("/login")}
                        >
                            Get Started Now
                        </button>
                        <button 
                            className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
                            onClick={() => navigate("/login")}
                        >
                            List Your Property
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
