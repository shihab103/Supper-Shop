import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Layout/Shared/Loading/Loading";
import useAuth from "../../Hooks/useAuth";

const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart/${user.id}`);
      setCartItems(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, [user]);

  if (loading) return <Loading />;
  if (cartItems.length === 0)
    return <p className="text-center mt-10">Your cart is empty.</p>;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded"
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.productName}</h3>
              <p>Price: {item.price}৳</p>
              <div className="flex items-center gap-2 mt-2">
                <label className="font-medium">Qty:</label>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="w-16 border rounded px-2 py-1"
                  readOnly
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold">Total: {totalPrice.toFixed(2)}৳</h3>
        <button className="btn btn-bg mt-3">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
