import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../../Layout/Shared/Loading/Loading";
import { HeartIcon as HeartOutline, HeartIcon as HeartSolid } from "@heroicons/react/24/outline";
import useAuth from "../../../Hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/product/${id}`);
        const data = await res.json();
        setProduct(data);

        // Fetch related products
        const relatedRes = await fetch(`${import.meta.env.VITE_API_URL}/products-by-category/${data.categoryId}`);
        const relatedData = await relatedRes.json();
        setRelatedProducts(relatedData.filter(p => p._id !== data._id));

      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch user's wishlist
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email/${user.email}`)
        .then(res => res.json())
        .then(data => {
          const ids = data.map(p => p._id);
          setWishlist(ids);
        });
    }
  }, [user]);

  useEffect(() => {
    setIsInWishlist(wishlist.includes(product?._id));
  }, [wishlist, product]);

  // Wishlist toggle
  const toggleWishlist = async () => {
    if (!user?.email) {
      alert("Please login first to use wishlist.");
      return;
    }

    if (!isInWishlist) {
      await fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, productId: product._id }),
      });
      setWishlist([...wishlist, product._id]);
    } else {
      await fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, productId: product._id }),
      });
      setWishlist(wishlist.filter(id => id !== product._id));
    }
  };

  if (loading) return <Loading />;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <section className="max-w-6xl mx-auto p-6 bg-white rounded shadow my-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side: Product Image */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded"
          />
          <div className="flex gap-4">
            {relatedProducts.slice(0, 3).map(rp => (
              <img
                key={rp._id}
                src={rp.image}
                alt={rp.name}
                className="w-20 h-20 object-cover rounded border cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Right Side: Info & Actions */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p><span className="font-semibold">Price:</span> {product.price}৳</p>
          <p><span className="font-semibold">Stock:</span> {product.stock} pcs</p>
          <p><span className="font-semibold">Category:</span> {product.categoryName}</p>
          <p><span className="font-semibold">Created At:</span> {new Date(product.createdAt).toLocaleDateString()}</p>
          {product.expiryDate && <p><span className="font-semibold">Expiry Date:</span> {new Date(product.expiryDate).toLocaleDateString()}</p>}

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mt-2">
            <span>Quantity:</span>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="input input-bordered w-20"
            />
          </div>
          <div className="flex gap-4 mt-2">
            <button className="btn btn-primary flex-1">Add to Cart</button>
            <button onClick={toggleWishlist} className="btn btn-outline flex items-center justify-center w-20">
              {isInWishlist ? <HeartSolid className="w-5 h-5 text-red-500"/> : <HeartOutline className="w-5 h-5"/>}
            </button>
          </div>

          {/* Delivery / Offer Info */}
          <div className="mt-4 text-gray-600">
            <p>🚚 Free delivery on orders over 500৳</p>
            <p>⚡ Fast delivery within 2-3 days</p>
            <p>💰 Discount available on bulk orders</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
        <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>

        <h3 className="text-2xl font-bold mt-8 mb-4">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map(rp => (
            <div key={rp._id} className="border p-4 rounded shadow">
              <img src={rp.image} alt={rp.name} className="w-full h-40 object-cover rounded"/>
              <h4 className="mt-2 font-semibold">{rp.name}</h4>
              <p>{rp.price}৳</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
