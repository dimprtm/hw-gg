import React from 'react';
import Search from "./Search";
import './Style.css';

const Home = () => {
    return (
        <div>
            <Search />
            <div className="gif">
                <img src="https://media.giphy.com/media/Vh8pbGX3SGRwFDh3V0/source.gif" alt="" />
            </div>
        </div>
    );
}

export default Home;