const sampleArray = [
    {
        key: "a001",
        name: "Wireless Microphone System",
        price: 50,
        category: "Microphones",
        dimensions: "10 x 6 x 3 inches",
        description: "Professional wireless microphone system with crystal-clear sound and long-range connectivity.",
        availability: true,
        image: [
            "https://example.com/images/wireless-mic1.jpg",
            "https://example.com/images/wireless-mic2.jpg"
        ]
    },
    {
        key: "a002",
        name: "DJ Mixer Console",
        price: 120,
        category: "Mixers",
        dimensions: "15 x 10 x 5 inches",
        description: "High-performance DJ mixer with multiple input channels and built-in effects.",
        availability: true,
        image: [
            "https://example.com/images/dj-mixer1.jpg"
        ]
    },
    {
        key: "a003",
        name: "PA Speaker System",
        price: 200,
        category: "Speakers",
        dimensions: "24 x 18 x 12 inches",
        description: "Powerful 1000W PA speaker system, ideal for live events, concerts, and parties.",
        availability: false,
        image: [
            "https://example.com/images/pa-speaker1.jpg"
        ]
    },
    {
        key: "a004",
        name: "Studio Headphones",
        price: 25,
        category: "Headphones",
        dimensions: "7 x 6 x 3 inches",
        description: "Over-ear studio headphones with noise isolation and high-fidelity sound.",
        availability: true,
        image: [
            "https://example.com/images/studio-headphones1.jpg"
        ]
    },
    {
        key: "a005",
        name: "Professional Audio Interface",
        price: 90,
        category: "Interfaces",
        dimensions: "8 x 5 x 2 inches",
        description: "USB audio interface with high-quality preamps and multiple input/output options.",
        availability: true,
        image: [
            "https://example.com/images/audio-interface1.jpg"
        ]
    }
];

import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItemPage() {

    const [items, setItems] = useState(sampleArray);

    return (
        <div className="w-full h-full relative">

            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Availability</th>
                </thead>
                <tbody>
                    {
                        items.map((product) => {
                            console.log(product);
                            return (
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Link to="/admin/items/add">
                <CiCirclePlus className="text-[70px] absolute right-2 bottom-2 hover:text-red-900" />
            </Link>
        </div>
    )
}