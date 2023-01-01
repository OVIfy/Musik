import { clientId, clientsecret } from "./keys";

const clientID = clientId
const clientSecret = clientsecret



let accessToken = null;

// client credentials flow spotify Api link https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
const getTokenOptions = {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      "Authorization":`Basic ${btoa(clientID + ':' + clientSecret)}`,
      "Content-Type" : "application/x-www-form-urlencoded"
    }
}

const getTopSongsOptions = {
    method: 'GET',
    headers: {
        "Authorization": accessToken
    }
}

const searchOptions = {
    method: 'GET',
    headers:{
        "Authorization": accessToken
    }
}

  // const form = new FormData()
  // form.append('grant_type','client_credentials')
  // tried doing the above but have no idea why it didn't work with the body

// function getSpotifyAcessToken(){
//     fetch('https://accounts.spotify.com/api/token',options)
//     .then((response) => response.json())
//     .then((response) => 
//         {
//             console.log('result from spotify api', response)
//             return response
//         })
//     .catch((error)=> console.log('error from spotify api',error))
// }


// let getSpotifyAcessToken = new Promise(function(resolve, reject){
//         fetch('https://accounts.spotify.com/api/token',getTokenOptions)
//         .then((response) => response.json())
//         .then((response) => 
//             {
//                 console.log('result from spotify api', response)
//                 resolve(response.token_type + ' ' + response.access_token)
//             })
//         .catch((error)=> 
//             {
//                 console.log('error from spotify api',error)
//                 reject(error)
//             })

// })

async function getSpotifyAcessToken(){
     return await fetch('https://accounts.spotify.com/api/token',getTokenOptions)
        .then((response) => response.json())
        .then((response) => 
            {
                return response.token_type + ' ' + response.access_token
            })
        .catch((error)=> 
            {
                return (error)
            })
}

async function getPlaylist(playlistID,type){
    let link = `https://api.spotify.com/v1/playlists/${playlistID}`
    switch (type) {
        case 'tracks':
            link = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
        break;
    }
    let token = await getSpotifyAcessToken()
    getTopSongsOptions.headers.Authorization = token
    return await fetch(link,getTopSongsOptions)
    .then((response) => response.json())
}

async function search(string){
    let token = await getSpotifyAcessToken()

    searchOptions.headers.Authorization = token
    return await fetch(`https://api.spotify.com/v1/search?q=${string}&type=track%2Cartist&limit=3`,searchOptions)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

async function Search(string,limit = 10,offset = 0){
    let token = await getSpotifyAcessToken()

    searchOptions.headers.Authorization = token
    return await fetch(`https://api.spotify.com/v1/search?q=${string}&type=track%2Cartist&limit=${limit}&offset=${offset}`,searchOptions)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

async function getArtist(artistId){
    let token = await getSpotifyAcessToken()

    searchOptions.headers.Authorization = token
    return await fetch(`https://api.spotify.com/v1/artists/${artistId}`,searchOptions)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

async function getArtistTopSongs(artistId){
    let token = await getSpotifyAcessToken()

    searchOptions.headers.Authorization = token
    return await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,searchOptions)
    .then((response) => response.json())
    .catch((error) => console.log(error))

}

async function getTrack(trackId){
    let token = await getSpotifyAcessToken()

    searchOptions.headers.Authorization = token
    return await fetch(`https://api.spotify.com/v1/tracks/${trackId}`,searchOptions)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

// getTrack('4kKdvXD0ez7jp1296JmAts')

//                   <-------------------------------- loaders ------------------------------------>
//  -------------------------------------------------------------------------------------------------
//  -------------------------------------------------------------------------------------------------
async function homeCenterLoader(){
    let {items} = await getPlaylist('37i9dQZEVXbMDoHDwVN2tF','tracks')

    return {items}
}

async function artistLoader({params}){
    let {tracks} = await getArtistTopSongs(params.artistId)
    let {name, images} = await getArtist(params.artistId)

    return {name, images, tracks}
}

async function homeLoader({request}){
    const url = new URL(request.url);
    const trackId = url.searchParams.get("nowPlaying");
    const currentSongIndex = url.searchParams.get('index')
    

    if(trackId != undefined){
        const track = await getTrack(trackId)
        const suggestedList = await getArtistTopSongs(track.artists[0].id)
        console.log('track', currentSongIndex)
        return {track, suggestedList, currentSongIndex}
    }
}

getArtist('1uNFoZAHBGtllmzznpCI3s')
export {clientID, clientSecret, getSpotifyAcessToken, getPlaylist, search, Search, accessToken, homeCenterLoader, artistLoader, homeLoader}