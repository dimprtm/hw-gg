import { Component } from "react";
import './Style.css';

const baseUrl = 'api.giphy.com/v1/gifs/search';
const giphy_key = process.env.REACT_APP_GIPHY_KEY;

class Search extends Component {

    state = {
        query: '',
        gifs: []
    }

    handleInput = e => this.setState({query: e.target.value});

    getGifs = async () => {
        const gifs = await fetch(`https://${baseUrl}?api_key=${giphy_key}&q=${this.state.query}&limit=12`)
        .then(response => response.json());

        this.setState({gifs: gifs.data});
        console.log(this.state.gifs);
    }


    render() {
        const {gifs} = this.state;

        return (
            <>
                <input type='text' onChange={this.handleInput} />
                <button type="submit" onClick={this.getGifs}>Search</button>
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
        );
    }
}

export default Search;