import React, { useState, useEffect } from "react";
import { getFavorites, likeSong, unlikeSong } from "../api";
import SongCard from "../Components/SongCard";

function SearchPage() {
	const userId = localStorage.getItem("spotify_user_id");
	const [likedSongs, setLikedSongs] = useState([]);

	// Beispielhafte Songs – später mit echter Suchfunktion ersetzen
	const [songs, setSongs] = useState([
		{
			songId: "1",
			title: "Night Ride",
			artist: "Moonlights",
			duration: 200,
		},
		{
			songId: "2",
			title: "Desert Drift",
			artist: "Wheels & Wind",
			duration: 180,
		},
	]);

	useEffect(() => {
		if (userId) {
			getFavorites(userId).then(setLikedSongs);
		}
	}, [userId]);

	const isLiked = (songId) => likedSongs.some((s) => s.songId === songId);

	const toggleLike = (song) => {
		if (isLiked(song.songId)) {
			unlikeSong(song.songId, userId);
			setLikedSongs(likedSongs.filter((s) => s.songId !== song.songId));
		} else {
			likeSong(song, userId);
			setLikedSongs([...likedSongs, song]);
		}
	};

	const dummySongs = [
  { songId: "1", title: "Night Ride", artist: "Moonlights" },
  { songId: "2", title: "Desert Drift", artist: "Wheels & Wind" }
];

return (
  <div className="search-results">
    {dummySongs.map((song) => (
      <SongCard
        key={song.songId}
        song={song}
        onHeartClick={() => toggleLike(song)}
        isLiked={isLiked(song.songId)}
      />
    ))}
  </div>
);

}

export default SearchPage;
