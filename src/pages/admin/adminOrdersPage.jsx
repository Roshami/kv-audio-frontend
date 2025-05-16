import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeOrder, setActiveOrder] = useState(null);
    const [modleOpen, setModleOpen] = useState(false);

    useEffect(() => {
        if (loading) {
            const token = localStorage.getItem("token");

            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ).then((res) => {
                console.log(res.data);
                setOrders(res.data);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })
        }
    }, [loading])


    const formatDate = (daysString) => {
        const date = new Date(daysString);
        return date.toISOString().split('T')[0]; // Extracts just the yyyy-mm-dd part
    }

    function handleOrderStatusChange(orderId, status) {
        const token = localStorage.getItem("token");

        //console.log(orderId, status);

        axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,
            {
                status: status
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then((res) => {
            console.log("Status updated successfully");
            setModleOpen(false);
            setLoading(true);
        }).catch((err) => {
            console.log(err);
            setLoading(true);
        })
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };


    return (
        <div className="w-full h-full p-6">
            <h1 className="text-2xl text-purple-800 font-bold mb-6">Orders Management</h1>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 cursor-pointer" onClick={
                                    () => {
                                        setActiveOrder(order);
                                        setModleOpen(true);
                                    }
                                }>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.orderId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.orderDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.days}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.startingDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.endingDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs.{order.totalAmount.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {
                modleOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-[#00000075] bg-opacity-50 flex justify-center items-center">
                        <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg relative">
                            <IoMdCloseCircleOutline className="absolute top-2 right-2 text-3xl cursor-pointer hover:text-red-700" onClick={() => setModleOpen(false)} />
                            <h2 className="text-2xl font-bold mb-4">Order Details</h2>
                            <p><span className="font-bold">Order ID:</span> {activeOrder.orderId}</p>
                            <p><span className="font-bold">Email:</span> {activeOrder.email}</p>
                            <p><span className="font-bold">Order Date:</span> {formatDate(activeOrder.orderDate)}</p>
                            <p><span className="font-bold">Days:</span> {activeOrder.days}</p>
                            <p><span className="font-bold">Start Date:</span> {formatDate(activeOrder.startingDate)}</p>
                            <p><span className="font-bold">End Date:</span> {formatDate(activeOrder.endingDate)}</p>
                            <p><span className="font-bold">Status:</span> {activeOrder.status}</p>
                            <p><span className="font-bold">Total Amount:</span> Rs.{activeOrder.totalAmount.toFixed(2)}</p>

                            <div className="w-full flex justify-left items-center my-5">
                                <button
                                    onClick={
                                        () => {
                                            handleOrderStatusChange(activeOrder.orderId, 'Approved');
                                        }
                                    }
                                    className="flex bg-green-500 text-white px-5 py-1 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105 cursor-pointer">
                                    Approve
                                </button>
                                <button
                                    onClick={
                                        () => {
                                            handleOrderStatusChange(activeOrder.orderId, 'Rejected');
                                        }
                                    }
                                    className="flex bg-red-500 text-white px-5 py-1 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 ml-4 cursor-pointer">
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
                                                <td className="px-6 py-4 text-center">{item.product.name}</td>
                                                <td className="px-6 py-4 text-center">{item.quantity}</td>
                                                <td className="px-6 py-4 text-center">{item.product.price}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>


                        </div>
                    </div>
                )
            }
        </div>
    )
}