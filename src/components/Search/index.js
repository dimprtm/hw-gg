import gif from '../../data/gif.js';
import SearchBar from './SearchBar.jsx';
import Gif from "./Gif";

const Search = () => {
    return (
        <div>
            <SearchBar />
            <Gif gifTitle={gif.title} gifUrl={gif.url} />
        </div>
    );
}

export default Search;