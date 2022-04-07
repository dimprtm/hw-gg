const Login = (handleLogin, logo) => {
    
    return(
        <div className="login">
          <button onClick={handleLogin} className="btn-spotify">
            <img src={logo} className="spotify-logo" />
            Login to Spotify
          </button>
        </div>
    );
}

export default Login;