import { Link } from "react-router-dom";

const Nav = () => {

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
    }

    return (
        <nav>
            <ul>
                Spotify App
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/create-playlist">Create Playlist</Link>
                </li>
                <li>
                    <Link onClick={handleLogout}>Logou</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;