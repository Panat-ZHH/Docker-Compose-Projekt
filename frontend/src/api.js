export async function getFavorites(userId) {
  const res = await fetch(`http://localhost:8080/api/favorites/${userId}`);
  return res.json();
}

const BASE_URL = "http://localhost:8080/api";

export async function likeSong(song, userId) {
	return fetch(`${BASE_URL}/favorites/like`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ ...song, userId }),
	});
}


export async function unlikeSong(songId, userId) {
  await fetch(`http://localhost:8080/api/favorites/${userId}/${songId}`, {
    method: "DELETE"
  });
}
