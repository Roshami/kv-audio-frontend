import axios from "axios";
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function AddReview() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rating: 0,
        comment: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
            window.location.href = "/login";
        }

        try{
            const decodedToken = jwt_decode(token);
            setFormData({
                name: decodedToken.name,
                email: decodedToken.email,
            });
        } catch (error) {
            console.error(error);
        }

    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsSubmitting(true);
        try {

            const token = localStorage.getItem("token");


            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, formData, {
                name: formData.name,
                email: formData.email,
                rating: formData.rating,
                comment: formData.comment
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);
            toast.success("Review added successfully");
            setIsSubmitting(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to add review");
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex flex-col w-full h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 px-8 py-5">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Leave a Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mt-4">
                    <label htmlFor="name" className="text-gray-600 font-medium">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        disabled
                        className="mt-2 p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="email" className="text-gray-600 font-medium">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="mt-2 p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="rating" className="text-gray-600 font-medium">Rating</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex flex-col mt-4">
                <label htmlFor="comment" className="text-gray-600 font-medium">Comment</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        className="mt-2 p-2 border border-gray-300 rounded-md"
                    />
                </div>
                    
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
                >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
                
                
                    
            </form >
        </div >
    )
}