import React from 'react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filters: string[];
  setFilters: (value: string[]) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Get the selected options from the dropdown
    const selectedOptions = e.target.selectedOptions;

    // Create an empty array to store the selected values
    const selectedValues = [];


    // Loop through each selected option and add its value to the array
    for (let i = 0; i < selectedOptions.length; i++) {
      selectedValues.push(selectedOptions[i].value);
    }

    // Update the filters state with the selected values
    setFilters(selectedValues);
  };

  return (
    <div className="mb-4 w-full max-w-md">
      <input 
        type="text" 
        value={searchTerm} 
        onChange={e => setSearchTerm(e.target.value)} 
        placeholder="Search by recipe name" 
        className="p-2 border rounded w-full mb-4"
      />
      <select 
        value={filters} 
        onChange={handleFilterChange} 
        className="p-2 border rounded w-full mb-4"
      >
        <option value="sort-a-z">Sort A-Z</option>
        <option value="sort-z-a">Sort Z-A</option>
      </select>
    </div>
  );
};

export default SearchFilter;