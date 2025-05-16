import { motion } from "framer-motion";

export default function Gallery() {
    const images = [
        "/gallery/image1.jpg",
        "/gallery/image2.jpg",
        "/gallery/image3.jpg",
        "/gallery/image4.jpg",
        "/gallery/image5.jpg",
        "/gallery/image6.jpg",
        "/gallery/image7.jpg",
        "/gallery/image8.jpeg",
        "/gallery/image9.jpg"
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Gallery Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-purple-800 mb-3">
                        Our Customer Gallery
                    </h2>
                    <p className="text-lg text-purple-600 max-w-2xl mx-auto">
                        Capturing memorable moments from our valued customers
                    </p>
                </motion.div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                            whileHover={{ scale: 1.03 }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 100
                            }}
                        >
                            <img 
                                src={src} 
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white font-medium text-lg">
                                    Event #{index + 1}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View More Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                    <button className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-dark transition-colors duration-300 shadow-md">
                        View More Photos
                    </button>
                </motion.div>
            </div>
        </div>
    );
}