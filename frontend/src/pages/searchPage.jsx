import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './SearchPage.css';

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
			const res = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(searchValue)}`, {
				headers: {
					Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
					'Accept-Language': 'de,de-DE;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,de-CH;q=0.5',
					'Cache-Control': 'max-age=0',
					'User-Agent':
						'Mozilla/5.0 (Linux; Android 6.0; Nexus 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36 Edg/137.0.0.0',
					// weitere Header nach Bedarf:
					'Sec-Ch-Ua': '"Microsoft Edge";v="137", "Chromium";v="137", "Not/A)Brand";v="24"',
					'Sec-Ch-Ua-Mobile': '?1',
					'Sec-Ch-Ua-Platform': '"Android"',
					'Sec-Fetch-Dest': 'document',
					'Sec-Fetch-Mode': 'navigate',
					'Sec-Fetch-Site': 'none',
					'Sec-Fetch-User': '?1',
					'Upgrade-Insecure-Requests': '1',
					// Cookies können dupliziert werden, falls nötig:
					Cookie: 'dzr_uniq_id=...; arl=...; jwt=...; jwt-Deezer=...; refresh-token=...; refresh-token-Deezer=...; ...',
				},
				credentials: 'include', // damit Cookies mitgesendet werden
			});

			const data = await res.json();

			if (data.error) {
				throw new Error(data.error.message);
			}

			setResults(data.data);
		} catch (err) {
			setError('Fehler beim Laden der Suchergebnisse.');
		} finally {
			setLoading(false);
		}
	};

	// Optional: Suche auslösen, wenn Enter gedrückt wird
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
							{results.map((track) => (
								<div key={track.id} className="result-card text-light border p-3 mb-3 bg-dark rounded">
									<img src={track.album.cover_small} alt={track.title} className="mb-2" />
									<h5>{track.title}</h5>
									<p>{track.artist.name}</p>
									<a
										href={track.link}
										target="_blank"
										rel="noopener noreferrer"
										className="btn btn-sm btn-primary mt-2"
									>
										Play on Deezer
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
