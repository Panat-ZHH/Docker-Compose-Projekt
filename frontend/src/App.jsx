import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SearchPage from "./pages/searchPage";
import Playlist from "./pages/playlist";

function App() {
const isLoggedIn = !!localStorage.getItem("spotify_token");

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/search" element={isLoggedIn ? <SearchPage /> : <Navigate to="/login" />} />
			<Route path="/playlist" element={isLoggedIn ? <Playlist /> : <Navigate to="/login" />} />
			<Route path="/" element={<Navigate to={isLoggedIn ? "/search" : "/login"} />} />
		</Routes>
	);
}

export default App;
