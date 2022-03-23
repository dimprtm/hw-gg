import logo from './logo.svg';
import './App.css';
import Search from './pages/home';
import Home from './pages/home';
import Album from './pages/home/Album';

// const giphy_key = process.env.REACT_APP_GIPHY_KEY;
// console.log("Giphy Secret Key" + giphy_key);

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Home />
      </header> */}
      <Album />
    </div>
  );
}

export default App;
