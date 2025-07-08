import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import './login.css';
import LoadingSpinner from '../../components/loadingSpinner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/google`,
          {
            accessToken: res.access_token,
          }
        );
        toast.success('Login Success');
        localStorage.setItem('token', response.data.token);
        navigate(response.data.user.role === 'Admin' ? '/admin' : '/');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Google login failed');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error('Google login failed');
    },
  });

  async function handleOnSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        {
          email: email,
          password: password,
        }
      );

      toast.success('Login successful');
      localStorage.setItem('token', response.data.token);

      if (response.data.user.emailVerified === false) {
        navigate('/verify-email');
        return;
      }

      navigate(response.data.user.role === 'Admin' ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
      console.error(err);
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
              className="w-24 h-24 object-cover mb-6 rounded-full border-2 border-white/30"
            />

            <h1 className="text-2xl font-bold text-white mb-8">Welcome Back</h1>

            <div className="w-full space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="Email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border-b-2 border-white/50 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="Password"
                  required
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                {isLoading ? (
                 <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  'Login'
                )}
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="absolute inset-0 border-t border-white/30"></div>
                <span className="relative bg-transparent px-4 text-white/80 text-sm">
                  OR
                </span>
              </div>

              <button
                type="button"
                onClick={googleLogin}
                disabled={isLoading}
                className="w-full py-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <FcGoogle className="text-xl" />
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-white/80 text-sm">
                Don't have an account?{' '}
                <a
                  href="/register"
                  className="text-yellow-400 hover:underline font-medium"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
