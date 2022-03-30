import { Component, useEffect, useState } from "react";
import './Style.css';

const baseUrl = 'https://api.giphy.com/v1/gifs/search';
const giphy_key = process.env.REACT_APP_GIPHY_KEY;

const Search = () => {

    const [query, setQuery] = useState('');
    const [gifs, setGifs] = useState([]);

    const handleInput = e => setQuery(e.target.value);

    useEffect(() => {
        // getGifs();
    }, [gifs]);

    const getGifs = async (e) => {
        e.preventDefault()
        const {data} = await fetch(`${baseUrl}?api_key=${giphy_key}&q=${query}&limit=12`)
        .then(response => response.json());

        setGifs(data);
        console.log(data);
    }

    return (
        <>
            <h2>GIPHY Search</h2>
            <form action="" onSubmit={getGifs}>
                <input type="text" onChange={handleInput} placeholder="Search tracks"/>
                <button type={"submit"}>Search</button>
            </form>
            {gifs.length > 0 && (
                <div className="gif-wrapp">
                    {gifs.map((gif) => {
                        return (
                            <div key={gif.id}>
                                <img src={gif.images.fixed_width.url} alt={gif.title}/>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    )
}

export default Search;