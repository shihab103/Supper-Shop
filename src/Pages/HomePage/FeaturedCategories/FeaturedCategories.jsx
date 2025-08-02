import React from 'react';
import Groceries from '../../../assets/Photos/CategoryImage/Groceries.jpg';
import CookingEssentials from '../../../assets/Photos/CategoryImage/CookingEssentials.jpg';
import PersonalCare from '../../../assets/Photos/CategoryImage/PersonalCare.jpg';
import DryFoods from '../../../assets/Photos/CategoryImage/Packaged&DryFoods.jpg';

const categories = [
  { name: 'Groceries', image: Groceries },
  { name: 'Cooking Essentials', image: CookingEssentials },
  { name: 'Personal Care', image: PersonalCare },
  { name: 'Packaged & Dry Foods', image: DryFoods },
];

const FeaturedCategories = () => {
  return (
    <section className="py-12 px-6 md:px-16 bg-gray-50">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Featured Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-700">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
