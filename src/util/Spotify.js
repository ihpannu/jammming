
const clientId = '4d6d170f2a0d4ff4ad67a1a259f00e9c';
const redirectUri = 'http://localhost:3000/';
const urlApi = 'https://accounts.spotify.com/authorize?';

let accessToken = '';
let expTime = '';

export const Spotify = {

	getAccessToken(term){
		let url = window.location.href;
		if(accessToken){
			return accessToken;
		}else if(url.match(/access_token=([^&]*)/) && url.match(/expires_in=([^&]*)/)){ 
			accessToken = url.match(/access_token=([^&]*)/)[1];
			expTime = url.match(/expires_in=([^&]*)/)[1];
			window.setTimeout(() => accessToken = '', expTime * 1000);
			return accessToken;	
		}
		else{
			console.log('redirect...');
			const queryUrl = urlApi + `client_id=${clientId}&redirect_uri=${redirectUri
			}&response_type=token&scope=playlist-modify-public`;
			window.location = queryUrl;
		}	
	},


	search(term){
		this.getAccessToken();
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
			{ 
				headers: {Authorization: `Bearer ${accessToken}`}
			})
			.then(response => response.json())
			.then(jsonResponse => {
				if(jsonResponse.tracks.items){
					return jsonResponse.tracks.items.map(track => {
						return {
							id: track.id,
							uri: track.uri,
							name: track.name,
							artist: track.artists[0].name,
							album: track.album.name
						};
					});
				}
			});
	},

	getUserId(){
		return fetch('https://api.spotify.com/v1/me', {headers: {Authorization: 'Bearer ' + accessToken}})
			.then(response => response.json())
			.then(jsonResponse => {
				return jsonResponse.id;				
			});
	},

	getPlaylistId(userId, name){
		return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
			{
				method: 'POST',
				headers: new Headers({
					'Content-Type' : 'application/json',
					'Authorization': 'Bearer ' + accessToken
				}),
				body: JSON.stringify({name: name}) 	
			})
			.then(response => response.json())
			.then(jsonResponse => {
				return jsonResponse.id;
			});
	},

	addPlaylistTracks(userId, playlistId, uriArr){
			fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks
`,
			{
				method: 'POST',
				headers: new Headers({
					'Content-Type' : 'application/json',
					'Authorization': 'Bearer ' + accessToken
				}),
				body: JSON.stringify({uris: uriArr}) 	
			})
			.then(response => response.json())
			.then(jsonResponse => {
				return;
			});
	},

	savePlaylist(name, uriArr){
		if(!(name && uriArr))
			return;

		this.getUserId().then(userId => {
			this.getPlaylistId(userId, name).then(playlistId => {
				this.addPlaylistTracks(userId, playlistId, uriArr);
			});
		});
	}

};

export default Spotify;

