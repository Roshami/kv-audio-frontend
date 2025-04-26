import { Link } from 'react-router-dom'
import './home.css'
import CardSlider from '../../components/CardSlider'
import SearchBar from '../../components/searchBar';
import { useState } from 'react';


export default function Home() {
    const [formData, setFormData] = useState({
        category: "All"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (query) => {
        console.log("Search term:", query);
        // You can add filter logic or API call here
    };

    return (
        <div className="w-full h-full">

            {/* Hero Section */}
            <div className="hero-bg-picture w-full h-[550px] md:h-[350px]  flex flex-col items-center justify-center">
                <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center px-[20px] pt-[20px]">

                    <h1 className="text-5xl font-bold text-white text-center">Premium Audio Rentals for Every Event</h1>
                    <p className="text-white text-center text-2xl">From studio mics to festival speakers,we’ve got you covered.</p>

                    <div className='flex flex-col sm:flex-row sm:gap-10'>
                        <Link to="/items" className="w-[200px] h-[50px] bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-accent transition-transform transform hover:scale-105 mt-5 text-center text-2xl"> Order Now</Link>
                        <Link to="/contact" className="w-[200px] h-[50px] bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-accent transition-transform transform hover:scale-105 mt-5 text-center text-2xl">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Product Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-purple-900 mb-8 text-center mt-10">Featured Products</h1>

                {/* Search and Filter Section for laptop */}
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:W-[49%]">
                        <div className="p-4">
                            <SearchBar onSearch={handleSearch} />
                        </div>
                        <div className="hidden md:block p-4">
                            <div className='flex flex-col justify-center items-center px-3' onChange={(e) => setCategory(e.target.value)}>
                                <h2 className="text-3xl font-bold text-purple-900  text-center mt-5 cursor-pointer">All Categories</h2>
                                <button className="w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-5 text-center text-xl cursor-pointer">
                                    Microphones
                                </button>
                                <button className="w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer">
                                    Mixers
                                </button>
                                <button className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    Speakers
                                </button>
                                <button className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    Amplifiers
                                </button>
                                <button className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    Wireless Mics
                                </button>
                                <button className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    DJ Gear
                                </button>
                                <button className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    Lighting
                                </button>
                                <button className='w-full h-[45px] bg-accent text-white px-5 py-2 rounded-lg hover:bg-blue-900 transition-transform transform hover:scale-105 mt-1 text-center text-xl cursor-pointer'>
                                    Accessories
                                </button>
                            </div>
                        </div>

                        {/* Search and Filter Section for mobile */}
                        <div className="block md:hidden p-4">
                            <div className='flex justify-center items-center px-3' onChange={(e) => setCategory(e.target.value)}>
                                <label htmlFor="category" className="block text-xl font-medium text-purple-700 mb-1 mr-3">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    onChange={handleChange}
                                    value={formData.category}
                                >
                                    <option value="Microphones">All</option>
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

                    {/* Card Slider */}
                    <div className="w-full md:W-[49%]"><CardSlider /></div>
                </div>
            </div>
        </div>
    )
}