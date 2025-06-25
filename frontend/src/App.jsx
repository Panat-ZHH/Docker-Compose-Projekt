import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/header';
import SearchPage from './pages/searchPage.jsx';
import Playlist from './pages/playlist.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Geschützte Route Komponente inline
	const ProtectedRoute = ({ children }) => {
		if (isLoggedIn) {
			return <Navigate to="/login" replace />;
		}
		return children;
	};

	return (
		<>
			<Header />
			<Routes>
				{/* Geschützte Seiten */}
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<SearchPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/search"
					element={
						<ProtectedRoute>
							<SearchPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/playlist"
					element={
						<ProtectedRoute>
							<Playlist />
						</ProtectedRoute>
					}
				/>

				{/* Öffentliche Seiten */}
				<Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</>
	);
}

export default App;
