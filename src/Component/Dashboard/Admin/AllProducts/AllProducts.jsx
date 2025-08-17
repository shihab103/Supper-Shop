import React, { useEffect, useState } from "react";
import Loading from "../../../../Layout/Shared/Loading/Loading";
import { useNavigate } from "react-router";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-12 px-6 md:px-16 bg-gray-50 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        All Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-xl overflow-hidden transition hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Price: ৳{product.price}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Stock: {product.stock}
              </p>
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="btn btn-outline btn-primary w-full"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
