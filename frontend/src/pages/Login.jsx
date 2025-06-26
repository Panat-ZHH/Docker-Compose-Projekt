import React, { useEffect } from "react";

function Login() {
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get("token");
		const user = urlParams.get("user");
		const id = urlParams.get("id");

		if (token && user && id) {
			localStorage.setItem("spotify_token", token);
			localStorage.setItem("spotify_user", user);
			localStorage.setItem("spotify_user_id", id);
			window.location.href = "/search"; // oder /playlist
		}
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>🎧 Login mit Spotify</h1>
			<a
				href="http://127.0.0.1:8080/api/spotify/login"
				className="btn btn-success mt-4"
			>
				Login starten
			</a>
		</div>
	);
}

export default Login;
