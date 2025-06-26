import React from "react";

function SongCard({ song, onHeartClick, isLiked }) {
	return (
		<div className="song-card">
			<strong>{song.title} – {song.artist}</strong>
			<br />
			<button onClick={onHeartClick}>
				{isLiked ? "❤️" : "🤍"}
			</button>
		</div>
	);
}


export default SongCard;
