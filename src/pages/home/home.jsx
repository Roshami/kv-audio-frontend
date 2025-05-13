import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import SearchBar from '../../components/searchBar';
import ReviewsCard from '../../components/reviewsCard';
import AddReview from '../../components/addreview';
import CardSlider from '../../components/cardSlider';

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`);
                setReviews(response.data.filter(review => review.status === 'Approved').slice(0, 3));
            } catch (err) {
                toast.error(err?.response?.data?.error || "Failed to load reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const handleSearch = (query) => {
        navigate(`/items?search=${query}`);
    };

    const categories = [
        "Microphones", "Mixers", "Speakers", "Amplifiers", 
        "Wireless Mics", "DJ Gear", "Lighting", "Accessories"
    ];

    return (
        <div className="w-full min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="relative w-full h-[70vh] min-h-[500px] bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                            Premium Audio Rentals for Every Event
                        </h1>
                        <p className="text-xl sm:text-2xl text-gray-200 mb-8">
                            From studio mics to festival speakers, we've got you covered.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link 
                                to="/items" 
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Order Now
                            </Link>
                            <Link 
                                to="/contact" 
                                className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-medium rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Product Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center">
                    Featured Products
                </h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Search and Categories */}
                    <div className="w-full lg:w-1/3">
                        <div className="mb-8">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                All Categories
                            </h2>
                            <div className="grid grid-cols-1 gap-3">
                                {categories.map((category) => (
                                    <Link 
                                        key={category}
                                        to={`/items?category=${encodeURIComponent(category)}`}
                                        className="px-4 py-3 bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-800 font-medium rounded-lg transition-all duration-300"
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Card Slider */}
                    <div className="w-full lg:w-2/3">
                        <CardSlider />
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-3">
                            Customer Reviews
                        </h2>
                        <p className="text-lg text-gray-600">
                            What our customers say about us
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-center">
                        <div className="w-full lg:w-1/2 flex justify-center">
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative"
                            >
                                <img 
                                    src="/system.png" 
                                    alt="Audio System" 
                                    className="max-h-[400px] object-contain"
                                />
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    Add Your Review
                                </button>
                            </motion.div>
                        </div>

                        <div className="w-full lg:w-1/2 space-y-6">
                            {loading ? (
                                <div className="flex justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                                </div>
                            ) : reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <motion.div
                                        key={review._id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <ReviewsCard review={review} />
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No reviews yet. Be the first to review!</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Review Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-4"
                    >
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <IoMdClose className="h-6 w-6" />
                        </button>
                        <AddReview onSuccess={() => {
                            setModalOpen(false);
                            setLoading(true);
                            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`)
                                .then((res) => {
                                    setReviews(res.data.filter(review => review.status === 'Approved').slice(0, 3));
                                })
                                .catch((err) => {
                                    toast.error(err?.response?.data?.error || "Failed to refresh reviews");
                                })
                                .finally(() => {
                                    setLoading(false);
                                });
                        }} />
                    </motion.div>
                </div>
            )}
        </div>
    );
}