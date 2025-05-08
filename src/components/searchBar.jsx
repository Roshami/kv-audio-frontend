import { useState } from 'react';

export default function SearchBar({ onSearch }){
    const [search, setSearch] = useState('');
    

    const handleInputChange = (e) => {
      //e.preventDefault();
     // console.log(e.target.value);
      setSearch(e.target.value);
      onSearch(e.target.value); // Send query to parent or use it here
    };
  
    return (
      <form onSubmit={handleInputChange} className="flex items-center max-w-md mx-auto mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-900 text-white rounded-r-md hover:bg-blue-600 transition-colors cursor-pointer"
        >
          Search
        </button>
      </form>
    );
}