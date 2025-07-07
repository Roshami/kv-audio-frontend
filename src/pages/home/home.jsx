import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../../components/searchBar';
import { useEffect, useState } from 'react';
import ReviewsCard from '../../components/reviewsCard';
import AddReview from '../../components/addreview';
import { IoMdClose } from 'react-icons/io';
import CardSlider from '../../components/cardSlider';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/loadingSpinner';

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`);
                setReviews(response.data);
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
            <section className="relative w-full h-[70vh] min-h-[500px] bg-[url('/hero-bg.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Premium Audio Rentals for Every Event
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-xl md:text-2xl text-white mb-8 max-w-2xl"
                    >
                        We've got you covered from studio mics to festival speakers.
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Link
                            to="/items"
                            className="px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Order Now
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-3 bg-transparent border-2 border-white text-white text-lg font-medium rounded-lg transition-all duration-300 hover:bg-white hover:text-blue-900 hover:scale-105"
                        >
                            Contact Us
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Product Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-purple-900 mb-12 text-center"
                >
                    Featured Products
                </motion.h2>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Search and Categories */}
                    <div className="w-full lg:w-1/3">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <SearchBar onSearch={handleSearch} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-xl shadow-md"
                        >
                            <h3 className="text-2xl font-bold text-purple-900 mb-6 text-center">All Categories</h3>
                            <div className="grid grid-cols-1 gap-3">
                                {categories.map((category, index) => (
                                    <Link
                                        key={category}
                                        to={`/items?category=${category}`}
                                        className="px-4 py-3 bg-purple-100 hover:bg-purple-700 hover:text-white text-purple-900 font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] text-center"
                                    >
                                        {category}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Card Slider */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-2/3"
                    >
                        <CardSlider />
                    </motion.div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-purple-50">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-purple-900 mb-4">Customer Reviews</h2>
                    <p className="text-lg text-purple-700">What our customers say about us</p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* System Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 flex flex-col items-center justify-end relative"
                    >
                        <img
                            src="/system.png"
                            alt="Audio System"
                            className="w-full max-w-md object-contain"
                        />
                        <button
                            onClick={() => setModalOpen(true)}
                            className="mt-8 px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Add Your Review
                        </button>
                    </motion.div>

                    {/* Reviews Cards */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
                                <AnimatePresence>
                                    {reviews
                                        .slice() // create a copy to avoid mutating original array
                                        .sort((a, b) => new Date(b.date) - new Date(a.date)) // sort descending: latest first
                                        .map((review, index) => (
                                            <motion.div
                                                key={review._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <ReviewsCard review={review} />
                                            </motion.div>
                                        ))
                                    }
                                </AnimatePresence>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Add Review Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                        onClick={() => setModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            >
                                <IoMdClose className="w-6 h-6" />
                            </button>
                            <AddReview onSuccess={() => {
                                setModalOpen(false);
                                setLoading(true);
                                axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`)
                                    .then((res) => {
                                        setReviews(res.data);
                                        setLoading(false);
                                    });
                            }} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}