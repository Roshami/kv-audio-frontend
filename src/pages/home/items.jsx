import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import SearchBar from "../../components/searchBar";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Items() {
    const [state, setState] = useState("loading"); // loading, success, error
    const [items, setItems] = useState([]);
    const [searchParams] = useSearchParams()
    const [category, setCategory] = useState(searchParams.get("category")||"all");
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState(location.query ||"");
    const [filteredItems, setFilteredItems] = useState([]);


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

    useEffect(() => {
        handleFilter();
    }, [searchTerm, category, items]);

    async function handleFilter() {
        try {
            let filtered = [...items];

            // If search term is provided
            if (searchTerm) {
                filtered = filtered.filter(
                    (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // If a category is selected
            if (category !== "all") {
                filtered = filtered.filter((item) => item.categary === category);
            }

            setFilteredItems(filtered);

        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.error || "An error occurred while filtering products");
        }
    }

    const handleSearch = (query) => {
        setSearchTerm(query);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center">Our Products</h1>

                {/* Search and Category Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                    <div className="p-4">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    <div className="p-4">
                        <div className='flex justify-center items-center px-3'>
                            <label htmlFor="category" className="block text-xl font-medium text-purple-700 mb-1 mr-3">
                                Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                            >
                                <option value="all">All Categories</option>
                                <option value="Microphones">Microphones</option>
                                <option value="Mixers">Mixers</option>
                                <option value="Speakers">Speakers</option>
                                <option value="Amplifiers">Amplifiers</option>
                                <option value="Wireless Mics">Wireless Mics</option>
                                <option value="DJ Gear">DJ Gear</option>
                                <option value="Lighting">Lighting</option>
                                <option value="Accessories">Accessories</option>
                            </select>
                        </div>
                    </div>
                </div>

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
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Success State */}
                {state === "success" && (
                    filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredItems.map((item) => (
                                <ProductCard key={item.key} item={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {items.map((item) => (
                                <ProductCard key={item.key} item={item} />
                            ))}
                        </div>
                    )
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
