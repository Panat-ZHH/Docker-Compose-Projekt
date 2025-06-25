import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './searchPage.css';

function SearchPage() {
	const [searchValue, setSearchValue] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSearch = async () => {
		if (!searchValue) return;

		setLoading(true);
		setError(null);
		setResults([]);

		try {
			const res = await fetch(`http://localhost:8080/api/spotify/search?query=${encodeURIComponent(searchValue)}`);
			const data = await res.json();

			if (!Array.isArray(data)) {
				throw new Error("Unerwartetes Format");
			}

			setResults(data);
		} catch (err) {
			console.error(err);
			setError('Fehler beim Laden der Suchergebnisse.');
		} finally {
			setLoading(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSearch();
		}
	};

	return (
		<div className="cyber-search-page">
			<div className="particle-field">
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
			</div>
			<div className="scan-lines"></div>

			<Container className="text-center position-relative">
				<div className="title-container mb-5">
					<h1 className="cyber-title">
						<span className="title-icon">🔎</span>
						<span className="title-text glitch-title" data-text="SEARCH">
							SEARCH
						</span>
					</h1>
					<div className="title-underline"></div>
				</div>

				<div className="search-container">
					<div className="search-glow-ring"></div>
					<div className="search-glow-ring-2"></div>

					<Form className="cyber-form" onSubmit={(e) => e.preventDefault()}>
						<div className="input-wrapper">
							<Form.Control
								type="text"
								placeholder="Search for songs, artists, albums..."
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								onKeyDown={handleKeyDown}
								className={`cyber-input ${isFocused ? 'focused' : ''} ${searchValue ? 'has-value' : ''}`}
							/>
							<div className="input-border-effect"></div>
							<div className="input-particles"></div>

							<div className="search-icon-holo" onClick={handleSearch} style={{ cursor: 'pointer' }}>
								<span className="search-icon-inner">🔍</span>
							</div>
						</div>
					</Form>

					<div className="search-suggestions">
						<div className="suggestion-item">🎵 Trending Now</div>
						<div className="suggestion-item">🎸 Rock Classics</div>
						<div className="suggestion-item">🎧 Electronic Beats</div>
						<div className="suggestion-item">🎤 Top Artists</div>
					</div>
				</div>

				{/* Ergebnisse */}
				<div className="search-results mt-5">
					{loading && <p className="text-light">🔄 Suche läuft...</p>}
					{error && <p className="text-danger">{error}</p>}
					{results.length > 0 && (
						<div className="results-grid">
							{results.map((track, index) => (
								<div key={index} className="result-card text-light border p-3 mb-3 bg-dark rounded">
									<h5>{track.name}</h5>
									<p>{track.artist}</p>
									<a
										href={track.url}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-sm btn-success mt-2"
									>
										Play on Spotify
									</a>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="cyber-grid"></div>
			</Container>
		</div>
	);
}

export default SearchPage;
// Note: This code assumes you have a backend API running at http://localhost:8080/api/spotify/search