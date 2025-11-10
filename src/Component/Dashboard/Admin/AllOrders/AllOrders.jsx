import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/all-orders`);
      const data = await res.json();

      const sortedData = data.sort(
        (a,b)=>new Date(b.orderDate) - new Date(a.orderDate)
      )

      setOrders(sortedData);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle order status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/update-order-status/${orderId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (res.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Order status updated");
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">🛒 All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg border p-6 hover:shadow-xl transition"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order ID: <span className="text-gray-500">{order._id}</span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>Customer:</strong> {order.customerName} (
                    {order.userEmail})
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Phone:</strong> {order.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Address:</strong> {order.billingAddress}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong>{" "}
                    {new Date(order.orderDate).toLocaleString()}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                  <p className="text-xl font-bold text-green-600 mb-2">
                    💰 Total: {order.totalAmount}৳
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border rounded-full px-3 py-1 text-sm focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="grid md:grid-cols-2 gap-4">
                {order.items?.map((item, idx) => (
                  <div
                    key={`${order._id}-${idx}`}
                    className="flex items-center gap-4 border rounded-xl p-3 bg-gray-50"
                  >
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.productName}</h4>
                      <p className="text-sm text-gray-600">
                        Price: {item.price}৳
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        Subtotal: {item.price * item.quantity}৳
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
