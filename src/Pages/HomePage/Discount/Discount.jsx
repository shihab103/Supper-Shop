import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Loading from "../../../Layout/Shared/Loading/Loading";
import { FaEye } from "react-icons/fa";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import DiscountBadge from "../../../Layout/Shared/DiscountBadge/DiscountBadge";

const Discount = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    // Detect screen size dynamically
    useEffect(() => {
      const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch Discount Products
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/discount`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => toast.error("Error loading products"))
      .finally(() => setLoading(false));
  }, []);

  // Fetch Wishlist
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email/${user.email}`)
        .then((res) => res.json())
        .then((data) => setWishlist(data.map((item) => item._id)))
        .catch(() => toast.error("Failed to load wishlist"));
    }
  }, [user]);

  const isInWishlist = (id) => wishlist.includes(id);

  // Wishlist Toggle
  const toggleWishlist = async (id) => {
    if (!user?.email) return toast.error("Please login to use wishlist.");

    try {
      if (!isInWishlist(id)) {
        await fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, productId: id }),
        });
        setWishlist([...wishlist, id]);
        toast.success("Added to wishlist ❤️");
      } else {
        await fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email, productId: id }),
        });
        setWishlist(wishlist.filter((pid) => pid !== id));
        toast.success("Removed from wishlist ❌");
      }
    } catch {
      toast.error("Something went wrong!");
    }
  };

  // Add to Cart
  const handleAddToCart = async (product) => {
    if (!user?.email) return toast.error("Please login to add to cart.");

    const priceToUse = product.finalPrice || product.price;
    const cartItem = {
      productId: product._id,
      productName: product.name,
      productImage: product.image,
      price: priceToUse,
      quantity: 1,
      userEmail: user.email,
      date: new Date().toISOString(),
      status: "pending",
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add-to-cart`, cartItem);
      toast.success(`${product.name} added to cart 🛒`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="py-12 px-6 md:px-16 min-h-screen bg">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-center mb-10">
        Discount Products
      </h2>

      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
        {products.map((product) => {
          const shortName =
            product.name.split(" ").length > 2
              ? product.name.split(" ").slice(0, 2).join(" ") + "..."
              : product.name;

          const hasDiscount = product.finalPrice < product.price;
          const discountPercent = hasDiscount
            ? (
                ((product.price - product.finalPrice) / product.price) *
                100
              ).toFixed(0)
            : 0;

          return (
            <div
              key={product._id}
              className="relative secondary px-4 pt-4 shadow-md rounded-2xl overflow-hidden group"
            >
              {/* Discount Badge with Lottie */}
              {hasDiscount && (
                <div className="absolute top-50 left-46 z-10">
                  <DiscountBadge discountPercent={discountPercent} />
                </div>
              )}

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg"
              />

              {/* Hover Icons */}
              {isLargeScreen && (
                <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2 secondary px-14 py-2 rounded-t-2xl flex items-center justify-center gap-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 cursor-pointer">
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
              )}

              {/* 📄 Content */}
              <div className="py-4">
                <h3 className="text-lg font-semibold">{shortName}</h3>
                <p className="text-sm font-semibold text-gray-700">
                  Price: ৳
                  {hasDiscount
                    ? product.finalPrice.toFixed(0)
                    : product.price.toFixed(0)}
                  {hasDiscount && (
                    <span className="line-through text-gray-400 ml-2">
                      ৳{product.price.toFixed(0)}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Stock: {product.stock}
                </p>

                <button
                  className="btn btn-sm primary text-white w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Discount;
