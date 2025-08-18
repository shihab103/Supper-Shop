import React, { useEffect, useState } from "react";
import { useAxiosSecure } from "../../../../utils/axiosSecure";
import Loading from "../../../../Layout/Shared/Loading/Loading";

const AllReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/all-review`);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <Loading/>;

  if (!reviews.length)
    return <p className="text-center mt-10">No reviews available.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
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
                  <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.reviewText}</p>
            <p className="text-xs text-gray-400">
              {new Date(review.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReview;
