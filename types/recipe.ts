export interface Recipe {
    id: string;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    author: string;
    photoUrl?: string;
  }
  
  export interface User {
    id: string;
    name: string;
  }