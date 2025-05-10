import { StarIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddReview() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        image: "",
        name: "",
        email: "",
        rating: 0,
        comment: "",
    });
    const [hoverRating, setHoverRating] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
            return;
        }

        try {
            const userData = jwtDecode(token);
            setFormData({
                image: userData.profilePicture || "/default-avatar.png",
                name: `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "Anonymous",
                email: userData.email || "",
                rating: 0,
                comment: "",
            });
        } catch (error) {
            console.error("Error decoding token:", error);
            toast.error("Error loading user data");
        }
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (formData.rating === 0) {
            toast.error("Please select a rating");
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("You are not authorized to add reviews");
            }

            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
                {
                    image: formData.image,
                    name: formData.name,
                    email: formData.email,
                    rating: formData.rating,
                    comment: formData.comment
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            toast.success("Review added successfully!");
            setFormData(prev => ({ ...prev, rating: 0, comment: "" }));
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to add review");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Leave a Review</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Profile */}
                <div className="flex items-center space-x-4">
                    <img 
                        src={formData.image} 
                        alt="Profile" 
                        className="w-14 h-14 rounded-full border-2 border-gray-200 object-cover" 
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{formData.name}</h3>
                        <p className="text-sm text-gray-500">{formData.email}</p>
                    </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Your Rating</label>
                    <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                type="button"
                                key={star}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setFormData({ ...formData, rating: star })}
                                className="focus:outline-none cursor-pointer"
                            >
                                <StarIcon
                                    className={`w-8 h-8 ${(hoverRating || formData.rating) >= star 
                                        ? "text-yellow-400" 
                                        : "text-gray-300"} transition-colors`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                        Your Review
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows="4"
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Share your experience..."
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || formData.rating === 0}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        isSubmitting || formData.rating === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                        </span>
                    ) : (
                        'Submit Review'
                    )}
                </button>
            </form>
        </div>
    );
}