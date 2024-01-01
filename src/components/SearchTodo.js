import React from 'react'

function SearchTodo() {
    const searchBarStyles={
        borderRadius:"10px",
        border:"none",
        padding:"5px",
        width:"100%"
    }
  return (
    <div><input type="text" placeholder='search...' style={searchBarStyles}/></div>
  )
}

export default SearchTodo