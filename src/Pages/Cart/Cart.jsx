import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../Layout/Shared/Loading/Loading";
import useAuth from "../../Hooks/useAuth";
import Lottie from "lottie-react";
import animation from "../../assets/Lotties/EmptyAnimation.json";

const Cart = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/cart?email=${user.email}`
        );
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
    return <div>
      <Lottie className="w-90 mx-auto" animationData={animation} loop={true}></Lottie>
      <h1 className="text-center text-black/60 mb-10">No Items in Your Cart</h1>
    </div>;

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

  // ✅ Checkout Handler
  const handleCheckout = async () => {
    if (!user?.email) return toast.error("You must be logged in to checkout");

    setCheckoutLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/checkout`,
        { email: user.email }
      );

      if (res.data.success) {
        toast.success("Order placed successfully!");
        setCartItems([]); // empty cart in UI
      } else {
        toast.error(res.data.error || "Checkout failed");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Failed to complete checkout");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex secondary flex-col sm:flex-row items-center gap-4 border p-4 rounded"
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
              className="btn primary text-white mt-2 sm:mt-0"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold">Total: {totalPrice.toFixed(2)}৳</h3>
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="btn primary text-white mt-3"
        >
          {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
