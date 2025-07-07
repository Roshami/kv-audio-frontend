import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ProductCard from '../../components/productCard';
import SearchBar from '../../components/searchBar';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../../components/loadingSpinner';

export default function Items() {
  const [state, setState] = useState('loading'); // loading, success, error
  const [items, setItems] = useState([]);
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.query || '');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (state === 'loading') {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
        .then((res) => {
          setItems(res.data);
          setState('success');
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error || 'An error occurred');
          setState('error');
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
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // If a category is selected
      if (category !== 'all') {
        filtered = filtered.filter((item) => item.categary === category);
      }

      setFilteredItems(filtered);
    } catch (err) {
      console.error(err);
      toast.error(
        err?.response?.data?.error ||
          'An error occurred while filtering products'
      );
    }
  }

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl sm:text-4xl mt-5 font-bold text-center text-purple-800 mb-2">
            Our Products
          </h1>
          <p className="text-center text-purple-600 max-w-2xl mx-auto">
            Discover high-quality audio equipment for every need
          </p>
        </motion.div>

        {/* Search and Category Filters */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-10 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-full md:w-1/2">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="w-full md:w-1/3">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
              <label
                htmlFor="category"
                className="block text-sm sm:text-base font-medium text-purple-700"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base"
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
        </motion.div>

        {/* Loading State */}
        {state === 'loading' && (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {state === 'error' && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-lg text-gray-600 mb-4">
              Failed to load products
            </p>
            <motion.button
              onClick={() => setState('loading')}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors cursor-pointer shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retry
            </motion.button>
          </motion.div>
        )}

        {/* Success State */}
        {state === 'success' && (
          <AnimatePresence>
            {(filteredItems.length > 0 ? filteredItems : items).length > 0 ? (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {(filteredItems.length > 0 ? filteredItems : items).map(
                  (item) => (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -5 }}
                    >
                      <ProductCard item={item} />
                    </motion.div>
                  )
                )}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-white p-8 rounded-lg shadow-md inline-block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-purple-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
