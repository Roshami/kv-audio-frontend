import { useEffect, useState } from 'react';
import { formatDate, loadCart } from '../../utils/cart';
import BookingItem from '../../components/bookingItem';
import toast from 'react-hot-toast';
import axios from 'axios';
import LoadingSpinner from '../../components/loadingSpinner';

export default function BookingPage() {
  const [cart, setCart] = useState(loadCart());
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [endDate, setEndDate] = useState(
    formatDate(new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
  );
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const daysBetween = Math.max(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
    1
  );

  function reloadCart() {
    setCart(loadCart());
    calculateTotal();
  }

  function calculateTotal() {
    const cartInfo = loadCart();
    cartInfo.startingDate = startDate;
    cartInfo.endingDate = endDate;
    cartInfo.days = daysBetween;

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo)
      .then((res) => {
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to calculate total');
      });
  }

  useEffect(() => {
    calculateTotal();
  }, [startDate, endDate]);

  function handleBookingCreation() {
    setLoading(true);
    const cart = loadCart();
    cart.startingDate = startDate;
    cart.endingDate = endDate;
    cart.days = daysBetween;

    const token = localStorage.getItem('token');
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.removeItem('cart');
        toast.success('Booking created successfully!');
        setCart(loadCart());
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || 'Failed to create booking');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 md:pt-[60px]">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-6 text-center">
          Create Booking
        </h1>

        {/* Date Selection */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                min={formatDate(new Date())}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-gray-700">
              Duration:{' '}
              <span className="font-bold text-blue-600">{daysBetween}</span>{' '}
              {daysBetween === 1 ? 'day' : 'days'}
            </p>
          </div>
        </div>

        {/* Booking Items */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Items
          </h2>
          {cart.orderedItems.length > 0 ? (
            <div className="space-y-4">
              {cart.orderedItems.map((item) => (
                <BookingItem
                  key={item.key}
                  itemKey={item.key}
                  qty={item.qty}
                  refresh={reloadCart}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Total and Submit */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Amount
            </h3>
            <p className="text-2xl font-bold text-blue-600">
              Rs. {total.toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleBookingCreation}
            disabled={loading || cart.orderedItems.length === 0}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
              loading || cart.orderedItems.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-accent hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
