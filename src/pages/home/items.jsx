import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function Items() {
    const [state, setState] = useState("loading"); // loading, success, error
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (state === "loading") {
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
                .then((res) => {
                    setItems(res.data);
                    setState("success");
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.error || "An error occurred");
                    setState("error");
                });
        }
    }, [state]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">Our Products</h1>
                
                {/* Loading State */}
                {state === "loading" && (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Error State */}
                {state === "error" && (
                    <div className="text-center py-20">
                        <p className="text-lg text-gray-600 mb-4">Failed to load products</p>
                        <button 
                            onClick={() => setState("loading")}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Success State */}
                {state === "success" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {items.map((item) => (
                            <ProductCard key={item.key} item={item} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {state === "success" && items.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-lg text-gray-600">No products available</p>
                    </div>
                )}
            </div>
        </div>
    );
}