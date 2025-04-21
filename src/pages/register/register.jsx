import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phone: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleOnSubmit(e) {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, formData);
            toast.success(response.data.message);
            navigate("/login");
        } catch (err) {
            toast.error(err?.response?.data?.error || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-picture flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <form 
                    onSubmit={handleOnSubmit}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden p-8 border border-white/20"
                >
                    <div className="flex flex-col items-center">
                        <img 
                            src="/logo.png" 
                            alt="logo" 
                            className="w-20 h-20 object-cover mb-6 rounded-full border-2 border-white/30"
                        />

                        <h1 className="text-2xl font-bold text-white mb-6">Create Account</h1>

                        <div className="w-full space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 transition-colors"
                                        placeholder="First Name"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/10 border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 transition-colors"
                                        placeholder="Last Name"
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/10 border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 transition-colors"
                                    placeholder="Email"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/10 border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 transition-colors"
                                    placeholder="Password"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/10 border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 transition-colors"
                                    placeholder="Address"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-white/10 border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 transition-colors"
                                    placeholder="Phone"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors duration-300 mt-4 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                ) : 'Register'}
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-white/80 text-sm">
                                Already have an account?{' '}
                                <a 
                                    href="/login" 
                                    className="text-yellow-400 hover:underline font-medium"
                                >
                                    Sign in
                                </a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}