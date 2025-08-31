import React from "react";

// fake data
const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://i.pravatar.cc/100?img=1",
    review:
      "This shop is amazing! The delivery was super fast and the product quality is excellent.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Smith",
    photo: "https://i.pravatar.cc/100?img=2",
    review:
      "Great customer service and affordable prices. I will definitely shop again.",
    rating: 4,
  },
  {
    id: 3,
    name: "Michael Brown",
    photo: "https://i.pravatar.cc/100?img=3",
    review:
      "The website is easy to use and checkout was smooth. Highly recommend!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-xl italic">Latest Testimonials</h2>
        <h1 className="text-3xl font-bold mb-8">What People Say</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="secondary p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full border"
                />
                <h3 className="font-semibold">{testimonial.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.review}"</p>
              <div className="flex justify-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={`text-xl ${
                      index < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
