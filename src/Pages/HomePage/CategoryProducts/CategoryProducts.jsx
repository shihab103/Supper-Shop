import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import Loading from "../../../Layout/Shared/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";

const CategoryProducts = () => {
  const { user } = useAuth();
  const email = user?.email;
  const { categoryName: categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Fetch products by category
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products-by-category/${categoryId}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  // Fetch user's wishlist
  useEffect(() => {
    if (!email) return;

    const fetchWishlist = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/wishlist-by-email/${email}`
        );
        const data = await res.json();
        setWishlist(data.map((product) => product._id)); // only store product IDs
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [email]);

  // Wishlist toggle function
  const toggleWishlist = async (productId) => {
    if (!email) {
      alert("Please login first to use wishlist.");
      return;
    }

    const isInWishlist = wishlist.includes(productId);

    if (!isInWishlist) {
      await fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId }),
      });
      setWishlist([...wishlist, productId]);
    } else {
      await fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productId }),
      });
      setWishlist(wishlist.filter((id) => id !== productId));
    }
  };

  if (loading) return <Loading />;

  return (
    <section className="py-12 px-6 md:px-16 bg-gray-50 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Products in "{products[0]?.categoryName || "Selected Category"}"
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative rounded-lg shadow-md p-4 bg-white flex flex-col justify-between"
            >
              {/* Wishlist Icon */}
              <button
                onClick={() => toggleWishlist(product._id)}
                className="absolute top-5 right-5"
              >
                {wishlist.includes(product._id) ? (
                  <HeartSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartOutline className="h-6 w-6 text-gray-400 hover:text-red-500" />
                )}
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <div className="mt-3">
                <h4 className="text-lg font-semibold">{product.name}</h4>
                <p className="text-gray-600">Price: {product.price}৳</p>
                <p className="text-sm text-gray-500 mb-3">
                  Available: {product.stock} pcs
                </p>
                <div className="flex justify-between gap-2">
                  <button className="btn btn-sm btn-success">Add</button>
                  <button
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryProducts;
