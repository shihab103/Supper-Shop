import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Layout/Shared/Loading/Loading";
import useAuth from "../../Hooks/useAuth";

const Cart = () => {
  const { user } = useAuth(); 
  console.log("User Email:", user?.email);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return; 

    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart?email=${user.email}`
        );
        console.log("Cart data:", res.data);
        setCartItems(res.data);
      } catch (err) {
        console.error("Cart fetch error:", err);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user?.email]);

  if (loading) return <Loading />;

  if (cartItems.length === 0)
    return <p className="text-center mt-10">Your cart is empty.</p>;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = async (itemId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${itemId}`);
      setCartItems(cartItems.filter((item) => item._id !== itemId));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

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
            <button
              onClick={() => handleRemove(item._id)}
              className="btn btn-danger mt-2 sm:mt-0"
            >
              Remove
            </button>
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
