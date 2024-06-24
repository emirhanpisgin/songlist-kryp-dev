export async function getAccessToken() {
	const response = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body:
			"grant_type=client_credentials&client_id=" +
			process.env.SPOTIFY_ID +
			"&client_secret=" +
			process.env.SPOTIFY_SECRET,
	});
	const body = await response.json();

	return body;
}
