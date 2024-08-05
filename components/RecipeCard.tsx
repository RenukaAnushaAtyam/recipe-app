import React from 'react';
import { Recipe } from '../types/recipe';
import Link from 'next/link';

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: string) => void;
}

const RecipeCard= ({ recipe, onDelete }: RecipeCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 max-w-sm mx-auto flex-col sm:max-w-md md:max-w-lg lg:max-w-xl">
      <h2 className="text-2xl font-bold mb-2 text-center">{recipe.title}</h2>
      <p className="text-gray-700 mb-4 text-center">{recipe.description}</p>
      <img src={recipe.photoUrl} alt={recipe.title} className="w-full object-cover h-48 rounded-md" />
      <div className="flex-col sm:flex-row sm:space-x-2">
        <Link href={{ pathname: '/recipe-form', query: { recipe: JSON.stringify(recipe) } }}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mb-2 sm:mb-0">Edit</button>
        </Link> 
        <button onClick={() => onDelete(recipe.id)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 mb-2 sm:mb-0">Delete</button>
        <Link href={{ pathname: '/recipe-details', query: { recipe: JSON.stringify(recipe) } }}>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 mb-2 sm:mb-0">View</button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;