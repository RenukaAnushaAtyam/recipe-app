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
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const loadRecipes = () => {
      const storedRecipes = localStorage.getItem('recipes');
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
    };

    loadRecipes();

    // Update recipes when localStorage changes
    window.addEventListener('storage', loadRecipes);

    return () => {
      window.removeEventListener('storage', loadRecipes);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleDelete = (id: string) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const applyFilters = (recipes: Recipe[]) => {
    let filteredRecipes = [...recipes];

    if (searchTerm) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filters.forEach(filter => {
    if (filter === 'sort-a-z') {
        filteredRecipes = filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
      }
    else if (filter === 'sort-z-a') {
        filteredRecipes = filteredRecipes.sort((a, b) => b.title.localeCompare(a.title));
      }
    });

    return filteredRecipes;
  };

  const filteredRecipes = applyFilters(recipes);

  return (
    <div className='flex h-full flex-col items-center bg-gray-100 p-6 justify-center w-full max-w-screen-lg mx-auto'>
      <h1 className='text-3xl font-bold mb-6 sm:text-4xl md:text-5xl'>Recipe List</h1>

      <SearchFilter 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        filters={filters} 
        setFilters={setFilters} 
      />

      {filteredRecipes.length > 0 ? (
        <div className='w-full'>
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <p className='text-center text-lg'>No recipes found.</p>
      )}

      <Link href="/recipe-form">
        <button className='bg-green-500 text-white rounded px-4 py-2 mt-6 inline-block text-center hover:bg-green-600 transition duration-300'>Add New Recipe</button>
      </Link>
    </div>
  );
};

export default Home;