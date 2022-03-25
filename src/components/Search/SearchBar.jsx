import React from 'react';
import './Style.css';

const SearchBar = () => {
    return (
        <div>
            <form className="search">
                <input type="text" />
                <input type="submit" value="Search" />
            </form>
        </div>
    );
}

export default SearchBar;