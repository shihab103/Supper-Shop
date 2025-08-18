import React, { useEffect, useState } from "react";
import { useAxiosSecure } from "../../../../utils/axiosSecure";
import Loading from "../../../../Layout/Shared/Loading/Loading";
import Swal from "sweetalert2";
import { TrashIcon } from "@heroicons/react/24/outline";

const AllReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // fetch all reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosSecure.get(
          `${import.meta.env.VITE_API_URL}/all-review`
        );
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // delete review
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(
          `${import.meta.env.VITE_API_URL}/review/${id}`
        );
        // remove deleted review from state
        setReviews(reviews.filter((review) => review._id !== id));
        Swal.fire("Deleted!", "Review has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting review:", error);
        Swal.fire("Error!", "Failed to delete review.", "error");
      }
    }
  };

  if (loading) return <Loading />;

  if (!reviews.length)
    return <p className="text-center mt-10">No reviews available.</p>;

  return (
    <div className="max-w-5xl bg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className=" card-bg rounded-lg p-4 shadow hover:shadow-lg transition relative group"
          >
            <div className="flex items-center gap-4 mb-2">
              <img
                src={review.userPhoto}
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{review.userName}</h3>
                <p className="text-sm text-gray-500">{review.userEmail}</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.reviewText}</p>
            <p className="text-xs text-gray-400">
              {new Date(review.date).toLocaleString()}
            </p>

            {/* Delete button at bottom-right, visible on hover */}
            <button
              onClick={() => handleDelete(review._id)}
              className="absolute bottom-2 right-2 text-red-500 hover:text-red-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReview;
