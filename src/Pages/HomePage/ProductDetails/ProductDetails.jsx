import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../../Layout/Shared/Loading/Loading";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import useAuth from "../../../Hooks/useAuth";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState("");
  const [myRating, setMyRating] = useState(0);
  const [userInfo, setUserInfo] = useState(null);

  // Fetch product, related products, reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/product/${id}`
        );
        const data = await res.json();
        setProduct(data);

        const relatedRes = await fetch(
          `${import.meta.env.VITE_API_URL}/products-by-category/${
            data.categoryId
          }`
        );
        const relatedData = await relatedRes.json();
        setRelatedProducts(
          relatedData.filter((p) => p._id !== data._id).slice(0, 4)
        );

        const reviewRes = await fetch(
          `${import.meta.env.VITE_API_URL}/reviews/${id}`
        );
        const reviewData = await reviewRes.json();
        setReviews(reviewData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Fetch wishlist
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email/${user.email}`)
        .then((res) => res.json())
        .then((data) => setWishlist(data.map((p) => p._id)));
    }
  }, [user]);

  const isInWishlist = product ? wishlist.includes(product._id) : false;

  const toggleWishlist = async () => {
    if (!user?.email) return alert("Please login to use wishlist.");

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
      setWishlist(wishlist.filter((id) => id !== product._id));
    }
  };

  // Fetch user info
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    }
  }, [user]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user?.email) return alert("Please login to review.");
    if (!userInfo) return alert("User info not loaded yet.");

    const reviewObj = {
      productId: product._id,
      userId: userInfo._id,
      userName: userInfo.name,
      userEmail: userInfo.email,
      userPhoto: userInfo.photo,
      rating: myRating,
      reviewText: myReview,
      date: new Date(),
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewObj),
    });

    if (res.ok) {
      setReviews([...reviews, reviewObj]);
      setMyReview("");
      setMyRating(0);
    }
  };

  if (loading) return <Loading />;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <section className="max-w-7xl mx-auto p-6 bg-white rounded shadow my-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Product Info + Reviews */}
        <div className="lg:w-2/3 flex flex-col gap-5">
          <h1 className="text-center font-bold text-xl">Product Details</h1>

          <div className="flex flex-col md:flex-row gap-4 p-3 border rounded shadow-sm relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full md:w-96 h-96 md:h-auto object-cover rounded"
            />

            {/* Wishlist button */}
            <button onClick={toggleWishlist} className="absolute top-3 right-3">
              {isInWishlist ? (
                <HeartSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartOutline className="h-6 w-6 text-gray-400 hover:text-red-500" />
              )}
            </button>

            <div className="flex flex-col justify-between flex-1 mt-4 md:mt-0">
              <div>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-700 mt-2">{product.description}</p>
                <p className="mt-1 font-semibold">Price: {product.price}৳</p>
                <p>Stock: {product.stock} pcs</p>
                <p>Category: {product.categoryName}</p>
                {product.createdAt && (
                  <p>
                    Added on: {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                )}
                {product.expiryDate && (
                  <p>
                    Expiry: {new Date(product.expiryDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button className="btn btn-primary mt-3">Add to Cart</button>
            </div>
          </div>

          {/* 3 Product Images */}
          <div className="flex gap-3">
            {[product.image, product.image, product.image].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
                className="h-24 border object-cover"
              />
            ))}
          </div>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
            {user && (
              <form
                onSubmit={submitReview}
                className="mb-6 flex flex-col gap-2"
              >
                <label className="font-semibold">Your Rating:</label>
                <select
                  value={myRating}
                  onChange={(e) => setMyRating(Number(e.target.value))}
                  className="select select-bordered w-full"
                >
                  <option value={0}>Select Rating</option>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} Star
                    </option>
                  ))}
                </select>
                <textarea
                  value={myReview}
                  onChange={(e) => setMyReview(e.target.value)}
                  className="textarea textarea-bordered w-full"
                  placeholder="Write your review..."
                  required
                />
                <button className="btn btn-primary w-full sm:w-auto">
                  Submit Review
                </button>
              </form>
            )}

            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="border p-3 rounded flex flex-col sm:flex-row gap-3 items-start mb-3"
              >
                <img
                  src={rev.userPhoto}
                  alt={rev.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold flex items-center gap-2">
                    {rev.userName}
                    <span className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </span>
                  </p>
                  <p className="text-gray-700">{rev.reviewText}</p>
                  <small className="text-gray-500">
                    {new Date(rev.date).toLocaleString()}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <h3 className="text-xl font-bold">Related Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            {relatedProducts.map((rp) => (
              <div
                key={rp._id}
                className="border p-2 rounded shadow-sm flex flex-col justify-between h-50"
              >
                <img
                  src={rp.image}
                  alt={rp.name}
                  className="w-full h-34 object-cover rounded mb-2"
                />
                <h4 className="font-semibold text-sm">{rp.name}</h4>
                <p className="text-sm">{rp.price}৳</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
