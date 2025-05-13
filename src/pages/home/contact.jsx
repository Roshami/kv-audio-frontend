import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import "./contact.css";
import { MdEmail } from "react-icons/md";
import { FaFacebook, FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { jwtDecode } from "jwt-decode";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (token) {
            const user = jwtDecode(token);
            setFormData({
                name: user.firstName + " " + user.lastName || "",
                email: user.email || "",
                subject: "",
                message: ""
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add your API call here to send the message

        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex p-5 w-full justify-center">
                <div className="flex w-[49%] justify-center">
                    <img src="/logo3D.png" alt="logo 3D image" className="w-full object-cover" />
                </div>
                <div className="flex flex-col w-[49%] justify-center p-5">
                    <h2 className="flex items-center gap-2"><MdEmail/> <span className="text-purple-600">k0H2G@example.com</span></h2>
                    <h2 className="flex items-center gap-2"><FaPhone/> <span className="text-purple-600">+91 1234567890</span></h2>
                    <h2 className="flex items-center gap-2"><FaLocationDot/> <span className="text-purple-600">123 Main Street, City, Country</span></h2>
                    <h2 className="flex items-center gap-2"><IoLogoWhatsapp/> <span className="text-purple-600">+91 1234567890</span></h2>
                    <h2 className="flex items-center gap-2"><FaFacebook/> <span className="text-purple-600"><a href="https://www.facebook.com/" target="_blank">https://www.facebook.com/</a></span></h2>
                </div>
            </div>
            <div className="flex items-center justify-center w-[51%] bg-contact-picture">
                <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white/10 flex items-center justify-center p-4">
                    <Toaster />
                    <motion.div
                        className="w-full max-w-xl bg-white/5 shadow-lg rounded-lg p-8"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
                            Contact Us
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                disabled
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border bg-white/40 rounded-md focus:ring-2 focus:ring-purple-400"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                required
                                disabled
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md bg-white/40 focus:ring-2 focus:ring-purple-400"
                            />

                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md bg-white/50 focus:ring-2 focus:ring-purple-400"
                            />

                            <textarea
                                name="message"
                                placeholder="Your Message"
                                rows="4"
                                required
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md bg-white/60 focus:ring-2 focus:ring-purple-400"
                            ></textarea>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
