import React, { useEffect, useState } from "react";
import Loading from "../../../../Layout/Shared/Loading/Loading";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import useAuth from "../../../../Hooks/useAuth";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/all-products`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch wishlist for logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email/${user.email}`)
        .then((res) => res.json())
        .then((data) => setWishlist(data.map((p) => p._id)))
        .catch(() => toast.error("Failed to load wishlist"));
    }
  }, [user]);

  const isInWishlist = (productId) => wishlist.includes(productId);

  const toggleWishlist = async (productId) => {
    if (!user?.email) return toast.error("Please login to use wishlist.");

    try {
      if (!isInWishlist(productId)) {
        await fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, productId }),
        });
        setWishlist([...wishlist, productId]);
        toast.success("Added to wishlist ❤️");
      } else {
        await fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, productId }),
        });
        setWishlist(wishlist.filter((id) => id !== productId));
        toast.success("Removed from wishlist ❌");
      }
    } catch (error) {
      console.error("Wishlist toggle error:", error);
      toast.error("Something went wrong!");
    }
  };

  // Add to Cart function
  const handleAddToCart = async (product) => {
    if (!user?.email) return toast.error("Please login to add to cart.");

    const cartData = {
      productId: product._id,
      productName: product.name,
      productImage: product.image,
      price: product.price,
      quantity: 1,
      userEmail: user.email,
      date: new Date().toISOString(),
      status: "pending",
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-to-cart`, cartData);
      toast.success(`${product.name} added to cart 🛒`);
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart");
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="py-12 px-6 md:px-16 bg min-h-screen relative">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
        {products.map((product) => {
          // 🔹 Limit product name to 2 words max
          const shortName = (() => {
            const words = product.name.split(" ");
            return words.length > 2 ? words.slice(0, 2).join(" ") + "..." : product.name;
          })();

          return (
            <div
              key={product._id}
              className="relative card-bg secondary px-4 pt-4 shadow-md rounded-2xl overflow-hidden transition hover:shadow-lg group"
            >
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-38 2xl:h-52 object-cover"
                />
              </div>

              {/* 🔹 Overlay (Only for desktop hover) */}
              <div className="hidden md:flex absolute bottom-40 left-1/2 transform -translate-x-1/2 secondary px-14 py-2 rounded-t-2xl items-center justify-center gap-4 opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 translate-y-4 transition-all duration-300 cursor-pointer">
                <FaEye
                  size={20}
                  className="hover:text-red-500"
                  onClick={() => navigate(`/product/${product._id}`)}
                />
                {isInWishlist(product._id) ? (
                  <HeartSolid
                    className="h-5 w-5 text-red-500"
                    onClick={() => toggleWishlist(product._id)}
                  />
                ) : (
                  <HeartOutline
                    className="h-5 w-5 text-gray-400 hover:text-red-500"
                    onClick={() => toggleWishlist(product._id)}
                  />
                )}
              </div>

              <div className="py-4">
                {/* 🔹 Shortened product name */}
                <h3 className="text-lg font-semibold mb-1">{shortName}</h3>
                <p className="text-sm text-gray-600 mb-1">Price: ৳{product.price}</p>
                <p className="text-sm text-gray-600 mb-3">Stock: {product.stock}</p>

                {/* ✅ Large screen: Add to Cart */}
                <div className="hidden md:block">
                  <button
                    className="btn primary text-white w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>

                {/* ✅ Mobile view: View Details + Wishlist */}
                <div className="flex items-center justify-between md:hidden">
                  <button
                    className="btn btn-sm primary text-white"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View Details
                  </button>

                  {isInWishlist(product._id) ? (
                    <HeartSolid
                      className="h-6 w-6 text-red-500 cursor-pointer"
                      onClick={() => toggleWishlist(product._id)}
                    />
                  ) : (
                    <HeartOutline
                      className="h-6 w-6 text-gray-400 hover:text-red-500 cursor-pointer"
                      onClick={() => toggleWishlist(product._id)}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AllProducts;
