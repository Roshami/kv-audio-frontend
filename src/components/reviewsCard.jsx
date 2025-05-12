import axios from "axios";
import { use, useEffect } from "react";
import { useState } from "react";

export default function ReviewsCard(props) {
    const [reviews, setReviews] = useState([]);
    const [state, setState] = useState("loading");

    useEffect(() => {
        if (state === "loading") {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`)
                .then((res) => {
                    console.log(res.data);
                    setReviews(res.data);
                    setState("success");
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.error || "An error occurred");
                    setState("error");
                });
        }
    })
    return (
        <div className="flex flex-col w-full h-[150px] bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        </div>
    );
}