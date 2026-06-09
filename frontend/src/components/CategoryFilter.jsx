import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6 md:mb-0">
      <h3 className="font-bold text-lg mb-4 border-b pb-2">Kategoriler</h3>
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-2 py-1 rounded transition-colors ${
              selectedCategory === null ? 'bg-brand-yellow text-brand-dark font-semibold' : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            Tümü
          </button>
        </li>
        {categories.map((category) => (
          <li key={category._id}>
            <button
              onClick={() => onSelectCategory(category._id)}
              className={`w-full text-left px-2 py-1 rounded transition-colors ${
                selectedCategory === category._id ? 'bg-brand-yellow text-brand-dark font-semibold' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
