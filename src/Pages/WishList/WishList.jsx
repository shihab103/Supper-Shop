import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { TrashIcon } from "@heroicons/react/24/solid";

const WishList = () => {
  const { user } = useAuth();
  const email = user?.email;
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    if (!email) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/wishlist-by-email/${email}`
      );
      const data = await res.json();
      setWishlistItems(data);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [email]);

  const removeFromWishlist = async (productId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId }),
      });
      setWishlistItems(wishlistItems.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  if (!email) return <p className="p-6">Please login to view your wishlist.</p>;
  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="card-bg p-4 rounded shadow flex flex-col justify-between relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />
              {/* Delete icon */}
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-500"
              >
                <TrashIcon className="w-6 h-6" />
              </button>

              <div className="mt-2 flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p>{item.price}৳</p>
                </div>
                {/* Details Button */}
                <button
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="btn btn-sm btn-bg"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WishList;
