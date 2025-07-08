import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  FiPackage,
  FiUsers,
  FiShoppingCart,
  FiStar,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/loadingSpinner';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState([]);

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Fetch all data in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication required');
        }

        const [itemsRes, ordersRes, usersRes, reviewsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/all`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/reviews`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setItems(itemsRes.data || []);
        setOrders(ordersRes.data || []);
        setUsers(usersRes.data || []);
        setReviews(reviewsRes.data || []);

        // Process data for stats
        processStats(
          itemsRes.data || [],
          ordersRes.data || [],
          usersRes.data || [],
          reviewsRes.data || []
        );
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(
          err.response?.data?.message ||
            err.message ||
            'Failed to load dashboard data. Please refresh.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processStats = (items = [], orders = [], users = [], reviews = []) => {
    const availableItems = items.filter((item) => item.avalibility === true);
    const pendingOrders = orders.filter((order) => order.status === 'Pending');
    const completedOrders = orders.filter(
      (order) => order.status === 'Completed'
    );
    const blockedUsers = users.filter((user) => user.isBlocked === true);
    const pendingReviews = reviews.filter(
      (review) => review.status === 'Pending'
    );
    const approvedReviews = reviews.filter(
      (review) => review.status === 'Approved'
    );

    const newStats = [
      {
        label: 'Total Products',
        value: items.length,
        data_label: 'Available Products',
        data_value: availableItems.length,
        color: 'bg-blue-500',
        icon: <FiPackage className="text-2xl" />,
        trend:
          items.length > 0
            ? ((availableItems.length / items.length) * 100).toFixed(1) + '%'
            : '0%',
      },
      {
        label: 'Total Orders',
        value: orders.length,
        data_label: 'Pending Orders',
        data_value: pendingOrders.length,
        color: 'bg-green-500',
        icon: <FiShoppingCart className="text-2xl" />,
        trend:
          orders.length > 0
            ? ((completedOrders.length / orders.length) * 100).toFixed(1) +
              '% completed'
            : '0%',
      },
      {
        label: 'Registered Users',
        value: users.length,
        data_label: 'Blocked Users',
        data_value: blockedUsers.length,
        color: 'bg-yellow-500',
        icon: <FiUsers className="text-2xl" />,
        trend:
          users.length > 0
            ? ((blockedUsers.length / users.length) * 100).toFixed(1) +
              '% blocked'
            : '0%',
      },
      {
        label: 'Product Reviews',
        value: reviews.length,
        data_label: 'Pending Reviews',
        data_value: pendingReviews.length,
        color: 'bg-purple-500',
        icon: <FiStar className="text-2xl" />,
        trend:
          reviews.length > 0
            ? ((approvedReviews.length / reviews.length) * 100).toFixed(1) +
              '% approved'
            : '0%',
      },
    ];

    setStats(newStats);
  };

  // Prepare data for order status chart
  const prepareOrderStatusData = () => {
    if (!Array.isArray(orders) || orders.length === 0) return [];

    const statusCounts = orders.reduce((acc, order) => {
      if (order && order.status) {
        acc[order.status] = (acc[order.status] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.keys(statusCounts).map((status) => ({
      name: status,
      value: statusCounts[status],
    }));
  };

  // Prepare data for top products chart based on order frequency
  const prepareTopProductsData = () => {
    if (!Array.isArray(orders) || orders.length === 0) return [];

    // Count how many times each product appears in orders
    const productCounts = orders.reduce((acc, order) => {
      if (order.orderedItems && Array.isArray(order.orderedItems)) {
        order.orderedItems.forEach((item) => {
          const productKey = item.product?.key;
          if (productKey) {
            acc[productKey] = {
              count: (acc[productKey]?.count || 0) + 1,
              name: item.product?.name || 'Unknown Product',
              price: item.product?.price || 0,
            };
          }
        });
      }
      return acc;
    }, {});

    // Convert to array and sort by count
    const sortedProducts = Object.entries(productCounts)
      .map(([key, value]) => ({
        key,
        name: value.name,
        count: value.count,
        price: value.price,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Take top 5

    return sortedProducts.map((product) => ({
      name:
        product.name.substring(0, 15) + (product.name.length > 15 ? '...' : ''),
      value: product.count,
      price: product.price,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md p-6 bg-red-50 rounded-lg shadow-md text-center">
          <FiAlertCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl text-blue-800 font-bold">Admin Dashboard</h1>
        
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all border-l-4 ${stat.color.replace('bg', 'border')}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <h2 className="text-3xl font-bold mt-1 text-gray-800">
                  {stat.value.toLocaleString()}
                </h2>
              </div>
              <div className={`p-3 rounded-full ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.data_label}</p>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {stat.data_value.toLocaleString()}
                  </h3>
                </div>
                <span className="text-sm font-medium text-gray-500">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Order Status Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-blue-900 font-semibold mb-4">
            Order Status Distribution
          </h2>
          <div className="h-64">
            {prepareOrderStatusData().length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareOrderStatusData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {prepareOrderStatusData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No order data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Top Products Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Most Ordered Products</h2>
          <div className="h-64">
            {prepareTopProductsData().length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={prepareTopProductsData()}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name, props) => {
                      if (name === 'Orders') return [value, `Orders: ${value}`];
                      if (name === 'Price')
                        return [
                          props.payload.price,
                          `Price: $${props.payload.price}`,
                        ];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Orders" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No product order data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mb-8">
        <h2 className="text-2xl text-blue-800 font-semibold mb-4">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-blue-900 font-semibold">Recent Orders</h2>
              <span className="text-sm text-gray-500">{orders?.length || 0} total orders</span>
            </div>
            {orders && orders.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {orders
                  .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                  .slice(0, 5)
                  .map((order) => (
                    <li key={order._id || Math.random()} className="py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Order #{order.orderId || order._id?.slice(-6) || 'N/A'}</p>
                          <p className="text-sm text-gray-500">
                            {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : 'Unknown date'} • 
                            {(order.orderedItems?.length || 0)} items
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status || 'Unknown'}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <FiShoppingCart className="mx-auto text-3xl text-gray-400 mb-2" />
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
            <div className="mt-4 text-right">
              <Link to="/admin/orders" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                View all orders →
              </Link>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-blue-900 font-semibold">Recent Reviews</h2>
              <span className="text-sm text-gray-500">{reviews?.length || 0} total reviews</span>
            </div>
            {reviews && reviews.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {reviews
                  .sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date))
                  .slice(0, 5)
                  .map((review) => (
                    <li key={review._id || Math.random()} className="py-3">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {review.user?.name?.charAt(0) || 'A'}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {review.user?.name || 'Anonymous'}
                          </p>
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${i < (review.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {review.comment || 'No comment provided'}
                          </p>
                          
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          review.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          review.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {review.status || 'Unknown'}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <FiStar className="mx-auto text-3xl text-gray-400 mb-2" />
                <p className="text-gray-500">No reviews found</p>
              </div>
            )}
            <div className="mt-4 text-right">
              <Link to="/admin/reviews" className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                View all reviews →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-blue-800 font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link to="/admin/items/add" className="p-4 bg-blue-50 rounded-lg text-center hover:bg-blue-100 transition">
            <FiPackage className="mx-auto text-2xl text-blue-500 mb-2" />
            <span className="text-sm font-medium">Add Product</span>
          </Link>
          <Link to="/admin/orders" className="p-4 bg-green-50 rounded-lg text-center hover:bg-green-100 transition">
            <FiShoppingCart className="mx-auto text-2xl text-green-500 mb-2" />
            <span className="text-sm font-medium">Process Orders</span>
          </Link>
          <Link to="/admin/users" className="p-4 bg-purple-50 rounded-lg text-center hover:bg-purple-100 transition">
            <FiUsers className="mx-auto text-2xl text-purple-500 mb-2" />
            <span className="text-sm font-medium">Manage Users</span>
          </Link>
          <Link to="/admin/reviews" className="p-4 bg-yellow-50 rounded-lg text-center hover:bg-yellow-100 transition">
            <FiStar className="mx-auto text-2xl text-yellow-500 mb-2" />
            <span className="text-sm font-medium">Moderate Reviews</span>
          </Link>
        </div>
      </div>
    </div>
  );
}