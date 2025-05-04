import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './cardSlider.css';
import ProductCard from './productCard';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CardSlider() {
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

    if (state === "loading") {
        return <div className="text-center py-12">Loading products...</div>;
    }

    if (state === "error") {
        return <div className="text-center py-12 text-red-500">Error loading products</div>;
    }

    return (
        <div className="relative max-w-4xl mx-auto px-4 py-12">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl: '.custom-prev',
                    nextEl: '.custom-next',
                }}
                pagination={{
                    clickable: true,
                    el: '.custom-pagination',
                    type: 'bullets',
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                className="w-full"
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id || item._id}>
                        <ProductCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation */}
            <div className="flex items-center justify-center mt-8 space-x-4">
                <button className="custom-prev p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <BiChevronLeft className="text-gray-700" />
                </button>

                <div className="custom-pagination flex space-x-2"></div>

                <button className="custom-next p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    <BiChevronRight className="text-gray-700" />
                </button>
            </div>
        </div>
    );
}