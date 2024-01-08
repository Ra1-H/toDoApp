import React from 'react'

function SearchTodo({onSearch}) {
    const searchBarStyles={
        borderRadius:"10px",
        border:"none",
        padding:"5px",
        width:"100%"
    }

    const handleSearchChange = (event) => {
      const searchQuery = event.target.value;
      onSearch(searchQuery);
    };
   
  return (
    <div><input type="text" placeholder='search...' style={searchBarStyles} onChange={handleSearchChange} /></div>
  )
}

export default SearchTodo