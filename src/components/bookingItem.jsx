import axios from "axios";
import { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../utils/cart";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import LoadingSpinner from "./loadingSpinner";

export default function BookingItem({ itemKey, qty, refresh }) {
    const [item, setItem] = useState(null);
    const [status, setStatus] = useState("loading"); // loading, success, error
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`);
                setItem(response.data);
                setStatus("success");
            } catch (err) {
                console.error(err);
                toast.error("Failed to load item");
                removeFromCart(itemKey);
                refresh();
                setStatus("error");
            }
        };

        if (status === "loading") {
            fetchItem();
        }
    }, [status, itemKey, refresh]);

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => {
            removeFromCart(itemKey);
            refresh();
            setIsRemoving(false);
        }, 300);
    };

    const handleQuantityChange = (change) => {
        if (change === -1 && qty === 1) {
            handleRemove();
            return;
        }
        addToCart(itemKey, change);
        refresh();
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <LoadingSpinner />
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="p-4 bg-red-50 rounded-lg shadow-sm border border-red-200 text-red-600 text-center">
                Item no longer available
            </div>
        );
    }

    return (
        <div className={`flex flex-col sm:flex-row items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 ${
            isRemoving ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}>
            {/* Product Image */}
            <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-md">
                <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-full h-full object-cover border border-gray-200"
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full">
                    <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-800 line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.categary}</p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                        {/* Price */}
                        <div className="text-lg font-medium text-gray-800 w-20 text-right">
                            Rs. {item.price.toFixed(2)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-200 rounded-md">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                aria-label="Decrease quantity"
                            >
                                <FaArrowDown className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-center w-10 border-x border-gray-200">
                                {qty}
                            </span>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                                aria-label="Increase quantity"
                            >
                                <FaArrowUp className="w-3 h-3" />
                            </button>
                        </div>

                        {/* Total Price */}
                        <div className="text-lg font-semibold text-blue-600 w-20 text-right">
                            Rs. {(item.price * qty).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Remove Button */}
            <button
                onClick={handleRemove}
                className="p-2 text-red-500 hover:text-white hover:bg-red-500 rounded-full transition-colors self-end sm:self-center"
                aria-label="Remove item"
            >
                <FaTrash className="w-4 h-4" />
            </button>
        </div>
    );
}