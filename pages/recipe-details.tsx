import React from 'react';
import { Recipe } from '../types/recipe';
import { useRouter } from 'next/router';

const RecipeDetails = () => {
  const router = useRouter();
  const { recipe } = router.query;

  const recipeData: Recipe = recipe ? JSON.parse(recipe as string) : null;

  if (!recipeData) {
    return <div className="flex items-center justify-center h-screen">
      <div className="text-xl font-semibold">Loading...</div>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-4xl font-bold mb-4">{recipeData.title}</h1>
      <img src={recipeData.photoUrl} alt={recipeData.title} className="w-full h-96 object-cover rounded-md mb-6" />
      <p className="text-lg text-gray-700 mb-4">{recipeData.description}</p>
      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-6">
        {recipeData.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-700">{ingredient}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Steps</h2>
      <ol className="list-decimal list-inside mb-6">
        {recipeData.steps.map((step, index) => (
          <li key={index} className="text-gray-700">{step}</li>
        ))}
      </ol>
      <p className="text-lg text-gray-700">Author: {recipeData.author}</p>
    </div>
  );
};

export default RecipeDetails;