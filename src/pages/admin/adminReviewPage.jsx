import { StarIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

export default function AdminReviewPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeReview, setActiveReview] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setReviews(response.data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to load reviews");
                toast.error("Failed to load reviews");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleReviewStatusChange = async (reviewId, status) => {
        setIsProcessing(true);
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/reviews/approve/${reviewId}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`Review ${status.toLowerCase()}`);
            setReviews(reviews.map(review => 
                review._id === reviewId ? { ...review, status } : review
            ));
            setModalOpen(false);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to update status");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (!window.confirm("Are you sure you want to delete this review?")) return;
        
        setIsProcessing(true);
        try {
            const token = localStorage.getItem("token");
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${reviewId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Review deleted successfully");
            setReviews(reviews.filter(review => review._id !== reviewId));
            setModalOpen(false);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to delete review");
        } finally {
            setIsProcessing(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const wordLimit = (text, limit) => {
        if (text.length > limit) {
            return text.substring(0, limit) + '...';
        }
        return text;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-purple-800">Reviews Management</h1>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Comment</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <tr 
                                            key={review._id} 
                                            className="hover:bg-gray-50 cursor-pointer"
                                            onClick={() => {
                                                setActiveReview(review);
                                                setModalOpen(true);
                                            }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img 
                                                            className="h-10 w-10 rounded-full object-cover" 
                                                            src={review.profilePicture || '/default-avatar.png'} 
                                                            alt={review.name} 
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{review.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                                <div className="line-clamp-2 ">{wordLimit(review.comment, 40)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex">
                                                    {Array.from({ length: review.rating }, (_, index) => (
                                                        <StarIcon key={index} className="h-5 w-5 text-yellow-400" />
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                                                {formatDate(review.date)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(review.status)}`}>
                                                    {review.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteReview(review._id);
                                                    }}
                                                    className="text-red-600 hover:text-red-900"
                                                    disabled={isProcessing}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            No reviews found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Review Details Modal */}
            {modalOpen && activeReview && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" onClick={() => setModalOpen(false)}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Review Details
                                    </h3>
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <IoMdClose className="h-6 w-6 cursor-pointer" />
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={activeReview.profilePicture || '/default-avatar.png'}
                                            alt={activeReview.name}
                                            className="h-16 w-16 rounded-full border-2 border-gray-200 object-cover"
                                        />
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900">{activeReview.name}</h4>
                                            <p className="text-sm text-gray-500">{formatDate(activeReview.date)}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center mb-2">
                                            <span className="text-sm font-medium text-gray-700 mr-2">Rating:</span>
                                            <div className="flex">
                                                {Array.from({ length: activeReview.rating }, (_, index) => (
                                                    <StarIcon key={index} className="h-5 w-5 text-yellow-400" />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <span className="text-sm font-medium text-gray-700">Comment:</span>
                                            <p className="mt-1 text-sm text-gray-600">{activeReview.comment}</p>
                                        </div>

                                        <div className="mt-4">
                                            <span className="text-sm font-medium text-gray-700">Status:</span>
                                            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activeReview.status)}`}>
                                                {activeReview.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                {activeReview.status !== 'Approved' && (
                                    <button
                                        type="button"
                                        onClick={() => handleReviewStatusChange(activeReview._id, 'Approved')}
                                        disabled={isProcessing}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 mb-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-75 cursor-pointer"
                                    >
                                        Approve
                                    </button>
                                )}
                                {activeReview.status !== 'Rejected' && (
                                    <button
                                        type="button"
                                        onClick={() => handleReviewStatusChange(activeReview._id, 'Rejected')}
                                        disabled={isProcessing}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-75 cursor-pointer"
                                    >
                                        Reject
                                    </button>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}