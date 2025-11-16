import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaEye } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import Loading from "../../../Layout/Shared/Loading/Loading";

export default function TopSale() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/top-selling-products`);
        const data = await res.json();
        const filteredData = data.slice(2);
        setTopProducts(filteredData);
      } catch (error) {
        console.error("Error fetching top selling products:", error);
        toast.error("Failed to load top selling products");
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  const truncateName = (name) => {
    const words = name.split(" ");
    return words.length > 2 ? `${words.slice(0, 2).join(" ")}...` : name;
  };

  if (loading) return <Loading />;

  return (
    <section className="py-12 px-6 md:px-16 bg min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Top Selling Products
      </h2>

      {topProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No top-selling products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {topProducts.map((product) => (
            <div
              key={product._id}
              className="relative card-bg secondary px-4 pt-4 shadow-md rounded-2xl overflow-hidden transition hover:shadow-lg group"
            >
              <div className="overflow-hidden rounded-t-xl bg-gray-100 flex items-center justify-center">
                <img
                  src={
                    product.productImage ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={product.productName}
                  className="w-full h-40 2xl:h-52 object-cover"
                />
              </div>

              <div className="py-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">
                  {truncateName(product.productName)}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Sold: <span className="font-medium">{product.totalSold}</span>
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  Revenue: ৳{product.totalRevenue}
                </p>

                <button
                  className="btn primary text-white w-full flex items-center justify-center gap-2"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <FaEye /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
