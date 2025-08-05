import React, { useEffect, useState, useRef } from "react";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Layout/Shared/Loading/Loading";

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { loading, setLoading } = useAuth();

  const intervalRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/get-category`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  // Auto-slide (pause on hover)
  useEffect(() => {
    if (!categories.length || isPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === categories.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [categories, isPaused]);

  // Get visible categories
  const getVisibleCategories = () => {
    if (categories.length === 0) return [];
    const items = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + categories.length) % categories.length;
      items.push({ ...categories[index], realIndex: index });
    }
    return items;
  };

  const visibleCategories = getVisibleCategories();

  if (loading) return <Loading />;

  return (
    <section className="py-12 px-6 md:px-16 bg-gray-50 overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Featured Categories
      </h2>

      <div className="flex justify-center items-center relative">
        <div
          className="flex transition-transform duration-1000 ease-in-out gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {visibleCategories.map((category, idx) => {
            const isCenter = idx === 2;

            return (
              <div
                key={category._id}
                onClick={() => setCurrentIndex(category.realIndex)} // Click to center
                className={`w-40 md:w-52 h-[260px] rounded-xl shadow-md cursor-pointer transform transition-all duration-500 flex-shrink-0
                  ${
                    isCenter
                      ? "scale-105 shadow-lg z-10"
                      : "scale-90 opacity-60"
                  }
                `}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-36 object-cover rounded-t-xl"
                />
                <div className="p-3 text-center">
                  <h3 className="text-base md:text-lg font-medium text-gray-700">
                    {category.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
