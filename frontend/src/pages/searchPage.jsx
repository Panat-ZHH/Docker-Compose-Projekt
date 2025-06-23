import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './SearchPage.css'; // Custom CSS für Cyber-Effekte

function SearchPage() {
	const [searchValue, setSearchValue] = useState('');
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className="cyber-search-page">
			{/* Animierte Hintergrund-Partikel */}
			<div className="particle-field">
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
				<div className="particle"></div>
			</div>

			{/* Scan-Linien Effekt */}
			<div className="scan-lines"></div>

			<Container className="text-center position-relative">
				{/* Cyber Title */}
				<div className="title-container mb-5">
					<h1 className="cyber-title">
						<span className="title-icon">🔎</span>
						<span className="title-text glitch-title" data-text="SEARCH">
							SEARCH
						</span>
					</h1>
					<div className="title-underline"></div>
				</div>

				{/* Search Form Container */}
				<div className="search-container">
					<div className="search-glow-ring"></div>
					<div className="search-glow-ring-2"></div>

					<Form className="cyber-form">
						<div className="input-wrapper">
							<Form.Control
								type="text"
								placeholder="Search for songs, artists, albums..."
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								className={`cyber-input ${isFocused ? 'focused' : ''} ${searchValue ? 'has-value' : ''}`}
							/>
							<div className="input-border-effect"></div>
							<div className="input-particles"></div>

							{/* Holographic Search Icon */}
							<div className="search-icon-holo">
								<span className="search-icon-inner">🔍</span>
							</div>
						</div>
					</Form>

					{/* Pulsing Search Suggestions */}
					<div className="search-suggestions">
						<div className="suggestion-item">🎵 Trending Now</div>
						<div className="suggestion-item">🎸 Rock Classics</div>
						<div className="suggestion-item">🎧 Electronic Beats</div>
						<div className="suggestion-item">🎤 Top Artists</div>
					</div>
				</div>

				{/* Cyber Grid Pattern */}
				<div className="cyber-grid"></div>
			</Container>
		</div>
	);
}

export default SearchPage;
