import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Layout/Shared/Loading/Loading";
import useAuth from "../../Hooks/useAuth";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1300); // lg breakpoint
  const { user } = useAuth();
  const navigate = useNavigate();

  // Detect screen size dynamically
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch all products (reverse order)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/all-products`);
        const data = await res.json();
        const reversedData = [...data].reverse();
        setProducts(reversedData);
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
        .catch((err) => console.error("Error fetching wishlist:", err));
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
        toast.success("Added to wishlist");
      } else {
        await fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, productId }),
        });
        setWishlist(wishlist.filter((id) => id !== productId));
        toast.success("Removed from wishlist");
      }
    } catch (err) {
      console.error("Wishlist toggle error:", err);
      toast.error("Something went wrong");
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
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      console.error("Add to cart error:", err);
      toast.error("Failed to add to cart");
    }
  };

  // truncate name if more than 2 words
  const truncateName = (name) => {
    const words = name.split(" ");
    if (words.length > 2) {
      return `${words.slice(0, 2).join(" ")}...`;
    }
    return name;
  };

  if (loading) return <Loading />;

  // show product count based on screen size
  const visibleProducts = isLargeScreen ? 10 : 8;

  return (
    <section className="py-12 px-6 md:px-16 bg min-h-screen relative">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {products.slice(0, visibleProducts).map((product) => (
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

            {/* Overlay with Eye + Heart */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 secondary px-14 py-2 rounded-t-2xl flex items-center justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer">
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
              <h3 className="text-lg font-semibold mb-1">
                {truncateName(product.name)}
              </h3>
              <p className="text-sm text-gray-600 mb-1">Price: ৳{product.price}</p>
              <p className="text-sm text-gray-600 mb-3">Stock: {product.stock}</p>

              <button
                className="btn primary text-white w-full"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
