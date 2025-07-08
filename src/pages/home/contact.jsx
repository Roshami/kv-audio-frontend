import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const contactItems = [
        { icon: <MdEmail className="text-blue-600 text-xl" />, text: "k0H2G@example.com" },
        { icon: <FaPhone className="text-blue-600 text-xl" />, text: "+91 1234567890" },
        { icon: <FaLocationDot className="text-blue-600 text-xl" />, text: "123 Main Street, City, Country" },
        { icon: <IoLogoWhatsapp className="text-blue-600 text-xl" />, text: "+91 1234567890" },
        { icon: <FaFacebook className="text-blue-600 text-xl" />, text: "https://www.facebook.com/", link: true }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Toaster />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.h1 
                    className="text-4xl font-bold text-center text-blue-800 mb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Get In Touch
                </motion.h1>
                <motion.p
                    className="text-lg text-blue-600 text-center mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    We'd love to hear from you! Reach out through any of these channels.
                </motion.p>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Contact Information */}
                    <motion.div 
                        className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-8"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold text-blue-800 mb-6">Contact Information</h2>
                        <div className="space-y-5">
                            {contactItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="flex items-start space-x-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                >
                                    <div className="mt-1">{item.icon}</div>
                                    <div className="text-gray-700">
                                        {item.link ? (
                                            <a 
                                                href="https://www.facebook.com/" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="hover:text-blue-600 transition-colors"
                                            >
                                                {item.text}
                                            </a>
                                        ) : (
                                            <span>{item.text}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div 
                            className="mt-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                        >
                            <h3 className="text-lg font-semibold text-blue-800 mb-3">Our Location</h3>
                            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256627466!2d-73.98784468459382!3d40.74844047932799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjQiTiA3M8KwNTknMTkuMiJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" 
                                    width="100%" 
                                    height="250" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy"
                                    className="rounded-lg shadow-md"
                                ></iframe>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div 
                        className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-8"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h2 className="text-2xl font-bold text-blue-800 mb-6">Send Us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                            >
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.5 }}
                            >
                                <textarea
                                    name="message"
                                    placeholder="Your Message"
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                ></textarea>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 shadow-md"
                                >
                                    Send Message
                                </motion.button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}