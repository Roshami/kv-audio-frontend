import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { IoMdCloseCircleOutline } from 'react-icons/io';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);
  const [modleOpen, setModleOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const itemsPerPage = 5;

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem('token');

      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [loading]);

  useEffect(() => {
    setCurrentPage(1); // Reset page when filters or search change
  }, [searchTerm, filterStatus]);

  const formatDate = (daysString) => {
    const date = new Date(daysString);
    return date.toISOString().split('T')[0]; // Extracts just the yyyy-mm-dd part
  };

  function handleOrderStatusChange(orderId, status) {
    const token = localStorage.getItem('token');

    //console.log(orderId, status);

    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log('Status updated successfully');
        setModleOpen(false);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter and search orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'All' ||
      (filterStatus === 'Approved' && order.status === 'Approved') ||
      (filterStatus === 'Rejected' && order.status === 'Rejected') ||
      (filterStatus === 'Pending' && order.status === 'Pending');

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const refreshData = () => {
    setCurrentPage(1);
    setSearchTerm('');
    setFilterStatus('All');
    setLoading(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-800">
              Orders Management
            </h1>
            <p className="text-gray-600">Manage all orders in the system</p>
          </div>
          <button
            onClick={refreshData}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </button>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search order by order ID or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Days
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setActiveOrder(order);
                        setModleOpen(true);
                      }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.orderDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.days}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.startingDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.endingDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Rs.{order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {paginatedOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No orders found matching your criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('All');
                }}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Clear filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{' '}
                to{' '}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredOrders.length)}
                </span>{' '}
                of <span className="font-medium">{filteredOrders.length}</span>{' '}
                Orders
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-md border ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {modleOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#00000075] bg-opacity-50 flex justify-center items-center">
          <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg relative">
            <IoMdCloseCircleOutline
              className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-700"
              onClick={() => setModleOpen(false)}
            />
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
            <p>
              <span className="font-bold">Order ID:</span> {activeOrder.orderId}
            </p>
            <p>
              <span className="font-bold">Email:</span> {activeOrder.email}
            </p>
            <p>
              <span className="font-bold">Order Date:</span>{' '}
              {formatDate(activeOrder.orderDate)}
            </p>
            <p>
              <span className="font-bold">Days:</span> {activeOrder.days}
            </p>
            <p>
              <span className="font-bold">Start Date:</span>{' '}
              {formatDate(activeOrder.startingDate)}
            </p>
            <p>
              <span className="font-bold">End Date:</span>{' '}
              {formatDate(activeOrder.endingDate)}
            </p>
            <p>
              <span className="font-bold">Status:</span> {activeOrder.status}
            </p>
            <p>
              <span className="font-bold">Total Amount:</span> Rs.
              {activeOrder.totalAmount.toFixed(2)}
            </p>

            <div className="w-full flex justify-left items-center my-5">
              <button
                onClick={() => {
                  handleOrderStatusChange(activeOrder.orderId, 'Approved');
                }}
                className="flex bg-green-500 text-white px-5 py-1 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 cursor-pointer"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  handleOrderStatusChange(activeOrder.orderId, 'Rejected');
                }}
                className="flex bg-red-500 text-white px-5 py-1 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 ml-4 cursor-pointer"
              >
                Reject
              </button>
            </div>

            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3"></th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {activeOrder.orderedItems.map((item) => {
                  return (
                    <tr key={item.product.key}>
                      <td className="px-6 py-4 text-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10"
                        />
                      </td>
                      <td className="px-6 py-4 text-center">
                        {item.product.name}
                      </td>
                      <td className="px-6 py-4 text-center">{item.quantity}</td>
                      <td className="px-6 py-4 text-center">
                        {item.product.price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
