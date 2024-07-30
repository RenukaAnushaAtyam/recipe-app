import React from 'react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filter: string;
  setFilter: (value: string) => void;
}

const SearchFilter = ({ searchTerm, setSearchTerm, filter, setFilter }:SearchFilterProps) => {
  return (
    <div className="mb-4 const SearchFilter: React.FC<SearchFilterProps> = ({ searchTerm, setSearchTerm, filter, setFilter }) => {w-full max-w-md">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Search by recipe name" 
        className="p-2 border rounded w-full mb-4"
      />
      <input 
        type="text" 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
        placeholder="Filter by ingredient" 
        className="p-2 border rounded w-full mb-4"
      />
    </div>
  );
};

export default SearchFilter;