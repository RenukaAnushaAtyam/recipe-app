import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';
import RecipeCard from '../components/RecipeCard'; // Ensure correct import path
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchFilter from '../components/SearchFilter';
import '../src/app/globals.css';

const Home = () => {    
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  useEffect(() => {
    if (router.query.newRecipe) {
      const newRecipe = JSON.parse(router.query.newRecipe as string);
      setRecipes((prevRecipes) => {
        const existingRecipeIndex = prevRecipes.findIndex(recipe => recipe.id === newRecipe.id);
        if (existingRecipeIndex >= 0) {
          const updatedRecipes = [...prevRecipes];
          updatedRecipes[existingRecipeIndex] = newRecipe;
          return updatedRecipes;
        }
        return [...prevRecipes, newRecipe];
      });
    }
  }, [router.query.newRecipe]);


  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleDelete = (id: string) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };


  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (filter ? recipe.ingredients.includes(filter) : true)
  );

  return (
    <div className='flex h-full flex-col items-center p-6'>
      <h1 className='text-3xl font-bold mb-6'>Recipe List</h1>

      <SearchFilter 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filter={filter} 
        setFilter={setFilter} 
      />

      {filteredRecipes.length > 0 ? (
        <div className='w-full'>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p>No recipes found.</p>
      )}

      <Link href="/recipe-form">
        <button className='bg-green-500 text-white rounded px-4 py-2 mt-4'>Add New Recipe</button>
      </Link>
    </div>
  );
};

export default Home;