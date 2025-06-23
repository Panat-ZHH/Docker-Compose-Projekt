import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './Playlist.css'; // Custom CSS für Cyber-Effekte

function Playlist() {
	const [activePlaylist, setActivePlaylist] = useState(null);

	// Dummy-Playlist-Daten
	const playlists = [
		{
			id: 1,
			name: 'Cyber Beats',
			count: 24,
			color: '#ff0080',
			icon: '🎧',
			genre: 'Electronic',
		},
		{
			id: 2,
			name: 'Neon Nights',
			count: 18,
			color: '#00ffff',
			icon: '🌃',
			genre: 'Synthwave',
		},
		{
			id: 3,
			name: 'Digital Dreams',
			count: 32,
			color: '#ff8000',
			icon: '💫',
			genre: 'Ambient',
		},
		{
			id: 4,
			name: 'Bass Matrix',
			count: 45,
			color: '#8000ff',
			icon: '🔊',
			genre: 'Bass',
		},
		{
			id: 5,
			name: 'Retro Wave',
			count: 28,
			color: '#00ff80',
			icon: '📻',
			genre: 'Retro',
		},
		{
			id: 6,
			name: 'Future Funk',
			count: 22,
			color: '#ff4080',
			icon: '🚀',
			genre: 'Funk',
		},
	];

	return (
		<div className="cyber-playlist-page">
			{/* Animierte Hintergrund-Wellen */}
			<div className="wave-container">
				<div className="wave wave-1"></div>
				<div className="wave wave-2"></div>
				<div className="wave wave-3"></div>
			</div>

			{/* Floating Music Notes */}
			<div className="music-notes">
				<div className="note note-1">♪</div>
				<div className="note note-2">♫</div>
				<div className="note note-3">♪</div>
				<div className="note note-4">♫</div>
				<div className="note note-5">♪</div>
			</div>

			{/* Scan-Linien Effekt */}
			<div className="scan-lines-playlist"></div>

			<Container className="position-relative">
				{/* Cyber Title */}
				<div className="playlist-title-container mb-5">
					<h1 className="cyber-playlist-title">
						<span className="title-icon-playlist">🎶</span>
						<span className="title-text-playlist glitch-playlist" data-text="PLAYLISTS">
							PLAYLISTS
						</span>
					</h1>
					<div className="title-underline-playlist"></div>
					<div className="equalizer-bars">
						<div className="bar"></div>
						<div className="bar"></div>
						<div className="bar"></div>
						<div className="bar"></div>
						<div className="bar"></div>
					</div>
				</div>

				{/* Playlist Grid */}
				<div className="playlist-grid">
					{playlists.map((playlist) => (
						<div
							key={playlist.id}
							className={`playlist-card ${activePlaylist === playlist.id ? 'active' : ''}`}
							onClick={() => setActivePlaylist(activePlaylist === playlist.id ? null : playlist.id)}
							style={{ '--playlist-color': playlist.color }}
						>
							<div className="card-glow"></div>
							<div className="card-border"></div>

							{/* Card Header */}
							<div className="card-header-playlist">
								<div className="playlist-icon-container">
									<span className="playlist-icon">{playlist.icon}</span>
									<div className="icon-pulse"></div>
								</div>
								<div className="card-corner-effects">
									<div className="corner-tl"></div>
									<div className="corner-tr"></div>
									<div className="corner-bl"></div>
									<div className="corner-br"></div>
								</div>
							</div>

							{/* Card Content */}
							<div className="card-content">
								<h3 className="playlist-name">{playlist.name}</h3>
								<div className="playlist-info">
									<span className="track-count">{playlist.count} tracks</span>
									<span className="genre-tag">{playlist.genre}</span>
								</div>
							</div>

							{/* Visualizer */}
							<div className="playlist-visualizer">
								<div className="viz-bar"></div>
								<div className="viz-bar"></div>
								<div className="viz-bar"></div>
								<div className="viz-bar"></div>
								<div className="viz-bar"></div>
								<div className="viz-bar"></div>
							</div>

							{/* Particle Effects */}
							<div className="card-particles"></div>
						</div>
					))}
				</div>

				{/* Create New Playlist Button */}
				<div className="create-playlist-container mt-5">
					<button className="create-playlist-btn">
						<span className="btn-icon-create">➕</span>
						<span className="btn-text-create">CREATE NEW PLAYLIST</span>
						<div className="btn-scan-line"></div>
					</button>
				</div>

				{/* Cyber Grid Background */}
				<div className="cyber-grid-playlist"></div>
			</Container>
		</div>
	);
}

export default Playlist;
