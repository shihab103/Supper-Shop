import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Loading from "../../../Layout/Shared/Loading/Loading";
import {
  HeartIcon as HeartOutline,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, StarIcon } from "@heroicons/react/24/solid";
import useAuth from "../../../Hooks/useAuth";
import Rating from "react-rating";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";

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
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [updatingDiscount, setUpdatingDiscount] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/product/${id}`
        );
        const data = await res.json();

        if (!data.finalPrice)
          data.finalPrice =
            data.price - ((data.discount || 0) * data.price) / 100;

        setProduct(data);

        // Related products
        const relatedRes = await fetch(
          `${import.meta.env.VITE_API_URL}/products-by-category/${
            data.categoryId
          }`
        );
        const relatedData = await relatedRes.json();
        setRelatedProducts(
          relatedData.filter((p) => p._id !== data._id).slice(0, 4)
        );

        // Reviews
        const reviewRes = await fetch(
          `${import.meta.env.VITE_API_URL}/reviews/${id}`
        );
        const reviewData = await reviewRes.json();
        setReviews(reviewData);
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/wishlist-by-email/${user.email}`)
        .then((res) => res.json())
        .then((data) => setWishlist(data.map((p) => p._id)))
        .catch(() => toast.error("Failed to load wishlist"));
    }
  }, [user]);

  const isInWishlist = product ? wishlist.includes(product._id) : false;

  const toggleWishlist = async () => {
    if (!user?.email) return toast.error("Please login to use wishlist.");
    try {
      if (!isInWishlist) {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/wishlist-by-email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, productId: product._id }),
          }
        );
        if (res.ok) {
          setWishlist([...wishlist, product._id]);
          toast.success("Added to wishlist ❤️");
        }
      } else {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/wishlist-by-email`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email, productId: product._id }),
          }
        );
        if (res.ok) {
          setWishlist(wishlist.filter((id) => id !== product._id));
          toast.success("Removed from wishlist ❌");
        }
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      toast.error("Something went wrong!");
    }
  };

  // Fetch user info
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setUserInfo(data))
        .catch(() => toast.error("Failed to load user info"));
    }
  }, [user]);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("Please login to review.");
    if (!userInfo) return toast.error("User info not loaded yet.");

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

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewObj),
      });

      if (res.ok) {
        const newReviewData = {
          ...reviewObj,
          date: reviewObj.date.toISOString(),
        };
        setReviews([...reviews, newReviewData]);
        setMyReview("");
        setMyRating(0);
        toast.success("Review submitted ✅");
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      console.error("Review error:", error);
      toast.error("Something went wrong!");
    }
  };

  // ✅ Updated handleDiscountChange function
  const handleDiscountChange = async (newDiscount) => {
    if (!product) return;
    setUpdatingDiscount(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/product/${product._id}/discount`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            discount: newDiscount,
          }),
        }
      );

      if (res.ok) {
        const updatedProduct = await res.json();
        setProduct(updatedProduct);

        toast.success("Discount and price updated successfully! 🎉");
      } else {
        toast.error("Failed to update discount");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setUpdatingDiscount(false);
    }
  };

  const addToCart = async () => {
    if (!user?.email) return toast.error("Please login first.");
    if (!userInfo) return toast.error("User info not loaded yet.");

    const cartItem = {
      productId: product._id,
      productName: product.name,
      productImage: product.image,
      price: product.finalPrice || product.price,
      quantity: 1,
      userId: userInfo._id,
      userEmail: userInfo.email,
      date: new Date(),
      status: "pending",
    };
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/add-to-cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });
      if (res.ok) {
        toast.success("Product added to cart 🛒");
      } else if (res.status === 409) {
        toast.error("Already in cart");
      } else {
        toast.error("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Cart error:", error);
      toast.error("Something went wrong.");
    }
  };

  const deleteProduct = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/product/${product._id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            navigate("/");
          } else {
            Swal.fire("Failed!", "Failed to delete product.", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };

  if (loading) return <Loading />;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  const isAdmin = userInfo?.role === "admin";

  // ✅ Display variables (final price now comes from product object)
  const currentDiscount = product.discount || 0;
  const currentFinalPrice = product.finalPrice || product.price;

  return (
    <section className="max-w-7xl mx-auto p-6 rounded shadow">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Product Info + Reviews */}
        <div className="lg:w-2/3 flex flex-col gap-5">
          <h1 className="text-center font-bold text-xl">Product Details</h1>

          <div className="flex secondary flex-col md:flex-row gap-4 p-3 rounded shadow-xl relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full md:w-96 h-96 md:h-auto object-cover rounded"
            />

            {/* Wishlist + Delete buttons (Conditional Admin Check on Delete) */}
            <div className="absolute top-3 right-3 flex gap-2">
              {isAdmin && (
                <button onClick={deleteProduct} className="hover:text-red-500">
                  <TrashIcon className="h-6 w-6" />
                </button>
              )}
              <button onClick={toggleWishlist}>
                {isInWishlist ? (
                  <HeartSolid className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartOutline className="h-6 w-6 text-gray-400 hover:text-red-500" />
                )}
              </button>
            </div>

            <div className="flex flex-col justify-between flex-1 mt-4 md:mt-0">
              <div>
                <h2 className="text-xl font-bold">{product.name}</h2>

                {/* Description */}
                <div className="mt-2">
                  <p className="text-gray-700">
                    {showFullDesc
                      ? product.description
                      : product.description.split(" ").slice(0, 15).join(" ") +
                        (product.description.split(" ").length > 15
                          ? "..."
                          : "")}
                  </p>
                  {product.description.split(" ").length > 15 && (
                    <button
                      onClick={() => setShowFullDesc(!showFullDesc)}
                      className="cursor-pointer inline font-semibold mt-1 hover:underline"
                    >
                      {showFullDesc ? "See Less" : "See More"}
                    </button>
                  )}
                </div>

                {/* Price */}
                <p className="mt-1 font-semibold">
                  Price: {currentFinalPrice}৳{" "}
                  {currentDiscount > 0 && (
                    <span className="line-through text-gray-400 ml-2">
                      {product.price}৳ {/* Original Price */}
                    </span>
                  )}
                </p>
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

              <div className="flex flex-col">
                {/* Discount Dropdown (Conditional Admin Check) */}
                {isAdmin && (
                  <div className="dropdown  mt-2">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn w-full  primary text-white"
                    >
                      {currentDiscount
                        ? `Discount: ${currentDiscount}%`
                        : "Set Discount"}
                    </div>
                    <ul
                      tabIndex={-1}
                      className="dropdown-content menu bg-base-100 rounded-box w-40 p-2 shadow z-[1]"
                    >
                      {[0, 10, 20, 30, 40, 50].map((d) => (
                        <li key={d}>
                          <button
                            disabled={updatingDiscount}
                            onClick={() => handleDiscountChange(d)}
                          >
                            {d === 0 ? "No Discount" : `${d}%`}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={addToCart}
                  className="btn primary text-white mt-3"
                >
                  Add to Cart
                </button>
              </div>
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
                <Rating
                  initialRating={myRating}
                  onChange={(value) => setMyRating(value)}
                  emptySymbol={
                    <span className="text-3xl text-gray-400">☆</span>
                  }
                  fullSymbol={
                    <span className="text-3xl text-yellow-500">★</span>
                  }
                />
                <textarea
                  value={myReview}
                  onChange={(e) => setMyReview(e.target.value)}
                  className="textarea textarea-bordered secondary w-full"
                  placeholder="Write your review..."
                  required
                />
                <button className="btn primary text-white shadow border-0 w-full sm:w-auto">
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
                className="secondary p-2 rounded shadow-xl flex flex-col justify-between h-50 cursor-pointer"
                onClick={() => navigate(`/product/${rp._id}`)}
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
