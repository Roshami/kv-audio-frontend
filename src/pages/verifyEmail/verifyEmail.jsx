import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
    const token = localStorage.getItem("token");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const sendOTP = async () => {
            try {
                await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                toast.success("OTP sent to your email");
            } catch (err) {
                console.error(err);
                toast.error("Failed to send OTP");
            }
        };
        sendOTP();
    }, [token]);

    const handleVerifyEmail = async () => {
        if (!otp) {
            toast.error("Please enter OTP");
            return;
        }
        
        setIsLoading(true);
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`, {
                code: parseInt(otp)
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("Email verified successfully");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Invalid OTP");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setIsResending(true);
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("New OTP sent to your email");
        } catch (err) {
            console.error(err);
            toast.error("Failed to resend OTP");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Verify Your Email</h1>
                        <p className="text-gray-600">We've sent a 6-digit code to your email address</p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                                Enter OTP Code
                            </label>
                            <input
                                type="number"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                placeholder="123456"
                                maxLength="6"
                            />
                        </div>

                        <button
                            onClick={handleVerifyEmail}
                            disabled={isLoading}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
                        >
                            {isLoading ? (
                                <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : 'Verify Email'}
                        </button>

                        <div className="text-center text-sm text-gray-600">
                            Didn't receive code?{' '}
                            <button
                                onClick={handleResendOTP}
                                disabled={isResending}
                                className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
                            >
                                {isResending ? 'Sending...' : 'Resend OTP'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}