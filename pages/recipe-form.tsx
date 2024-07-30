import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';
import { useRouter } from 'next/router';

interface RecipeFormProps {
  initialData?: Recipe;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [ingredients, setIngredients] = useState<string[]>(initialData?.ingredients || []);
  const [steps, setSteps] = useState<string[]>(initialData?.steps || []);
  const [photoUrl, setPhotoUrl] = useState(initialData?.photoUrl || '');
  const [ingredientInput, setIngredientInput] = useState('');
  const [stepInput, setStepInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.query.recipe) {
      const recipe = JSON.parse(router.query.recipe as string);
      setTitle(recipe.title);
      setDescription(recipe.description);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
      setPhotoUrl(recipe.photoUrl);
    }
  }, [router.query.recipe]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ingredientInput]);
    setIngredientInput('');
  };

  const handleAddStep = () => {
    setSteps([...steps, stepInput]);
    setStepInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: initialData?.id || new Date().toISOString(),
      title,
      description,
      ingredients,
      steps,
      author: 'Current User', // Replace with actual user data
      photoUrl,
    };

    const storedRecipes = localStorage.getItem('recipes');
    let updatedRecipes: Recipe[] = storedRecipes ? JSON.parse(storedRecipes) : [];

    if (initialData) {
      // If editing, remove the original recipe first
      updatedRecipes = updatedRecipes.filter(recipe => recipe.id !== initialData.id);
    }

    updatedRecipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));

    router.push('/');
  };

  return (
    <div className='flex flex-col h-full justify-center items-center bg-gray-100 p-4'>
      <h1 className='text-3xl font-bold mb-6'>{initialData ? 'Edit Recipe' : 'Create new Recipe'}</h1>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
      <div className="mb-4">
      <h2 className="font-bold mb-2">Title</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="mb-4 p-2 border rounded w-full" />
        </div>
        <div className="mb-4">
          <h2 className="font-bold mb-2">Description</h2>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="mb-4 p-2 border rounded w-full" />
        </div>
        <div className="mb-4">
          <h2 className="font-bold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-2">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">{ingredient}</li>
            ))}
          </ul>
          <input type="text" value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} placeholder="Add Ingredient" className="p-2 border rounded w-full mb-2" />
          <button type="button" onClick={handleAddIngredient} className="bg-blue-500 text-white rounded px-4 py-2">Add Ingredient</button>
        </div>

        <div className="mb-4">
          <h2 className="font-bold mb-2">Steps</h2>
          <ol className="list-decimal list-inside mb-2">
            {steps.map((step, index) => (
              <li key={index} className="text-gray-700">{step}</li>
            ))}
          </ol>
          <input type="text" value={stepInput} onChange={(e) => setStepInput(e.target.value)} placeholder="Add Step" className="p-2 border rounded w-full mb-2" />
          <button type="button" onClick={handleAddStep} className="bg-blue-500 text-white rounded px-4 py-2">Add Step</button>
        </div>
        <div className="mb-4">
        <h2 className="font-bold mb-2">Upload Image</h2>
        <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} placeholder="Photo URL" className="mb-4 p-2 border rounded w-full" />
        </div>
        <button type="submit" className="bg-green-500 text-white rounded px-4 py-2 w-full">Submit</button>
      </form>
    </div>
  );
};

export default RecipeForm;