import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthContext";
import Loading from "../../../../Layout/Shared/Loading/Loading";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders for logged-in user
  const fetchMyOrders = async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/my-orders/${user.email}`
      );
      const data = await res.json();

      const sortedData = data.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );

      setOrders(sortedData);
    } catch (err) {
      console.error("Failed to fetch your orders:", err);
      toast.error("Failed to load your orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [user]);

  // Cancel Order (Only Pending)
  const handleCancel = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cancel-order/${orderId}`,
        { method: "PATCH" }
      );

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: "cancelled" } : o
          )
        );
        toast.success("Order cancelled successfully");
      } else {
        toast.error("Failed to cancel order");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (loading) return <Loading/>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="secondary rounded-2xl shadow-lg border p-6 hover:shadow-xl transition"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-3 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    Order ID: <span className="text-gray-500">{order._id}</span>
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>Date:</strong>{" "}
                    {new Date(order.orderDate).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Phone:</strong> {order.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Address:</strong> {order.billingAddress}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                  <p className="text-xl font-bold text-green-600 mb-2">
                    💰 Total: {order.totalAmount}৳
                  </p>

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

                  {/* Cancel Button (Only Pending) */}
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="mt-2 px-4 py-1 primary text-white rounded-full text-sm hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>

              {/* Order items */}
              <div className="grid md:grid-cols-2 gap-4">
                {order.items?.map((item, idx) => (
                  <div
                    key={`${order._id}-${idx}`}
                    className="flex bg items-center gap-4 border rounded-xl p-3 bg-gray-50"
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

export default MyOrders;
