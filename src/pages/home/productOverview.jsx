import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart, loadCart } from "../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
    const { key } = useParams();
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`);
                setProduct(response.data);
                setLoadingStatus("loaded");
            } catch (err) {
                console.error(err);
                setLoadingStatus("error");
                toast.error("Failed to load product");
            }
        };

        fetchProduct();
    }, [key]);

    const handleAddToCart = () => {
        addToCart(product.key, quantity);
        toast.success(`${product.name} added to cart`);
        console.log(loadCart());
    };

    if (loadingStatus === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (loadingStatus === "error") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Product</h1>
                    <p className="text-gray-600 mb-4">We couldn't load the requested product. Please try again later.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {product && (
                    <div className="flex flex-col lg:flex-row gap-8">

                        <h1 className="text-3xl md:hidden font-bold text-center text-gray-900 mt-5">{product.name}</h1>

                        {/* Product Images */}
                        <div className="w-full lg:w-1/2 md:pt-[30px]">
                            <div className="sticky top-24">
                                <ImageSlider images={product.image} />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="w-full lg:w-1/2 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h1 className="text-3xl font-bold text-center text-gray-900 mb-4 hidden md:block">{product.name}</h1>
                                <div className="flex items-center mb-4">
                                    <span className="text-xl font-semibold text-gray-800">Rs. {product.price.toFixed(2)}</span>
                                    {product.avalibility && (
                                        <span className="ml-4 px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                                            In Stock
                                        </span>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
                                    <p className="text-gray-600">{product.description}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Category</h3>
                                        <p className="text-sm text-gray-900">{product.categary}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Dimensions</h3>
                                        <p className="text-sm text-gray-900">{product.dimentions}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                                        Quantity
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                            className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            id="quantity"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-16 text-center border-t border-b border-gray-300 py-1"
                                        />
                                        <button
                                            onClick={() => setQuantity(prev => prev + 1)}
                                            className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}