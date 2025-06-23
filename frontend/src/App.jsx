import { Routes, Route } from 'react-router-dom';
import Header from './Components/header';
import SearchPage from './pages/searchPage.jsx';
import Playlist from './pages/playlist.jsx';

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<SearchPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/playlist" element={<Playlist />} />
			</Routes>
		</>
	);
}

export default App;
