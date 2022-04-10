import logo from './logo.svg';
import './App.css';
// import Search from './components/Search';
import Spotify from './components/Spotify';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreatePlaylist from './components/Spotify/CreatePlaylist';

// console.log(gif);

// const giphy_key = process.env.REACT_APP_GIPHY_KEY;
// console.log("Giphy Secret Key" + giphy_key);

function App() {
  return (
    // <div className="App">
    //   {/* <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <Home />
    //   </header> */}
    //   {/* <Album /> */}
    //   {/* <Search /> */}
    //   {/* <GifComp /> */}
    //   {/* <Search /> */}
    //   <Spotify />
    // </div>

    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Spotify} />
        <Route exact path="/create-playlist" component={CreatePlaylist} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
