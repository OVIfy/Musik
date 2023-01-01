import { Chip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState, useEffect } from 'react'
import MusicCard from '../components/musicCard/MusicCard'
import genres from './genre'
import HeadphonesIcon from '@mui/icons-material/Headphones';
import axios from "axios";

import { fillterContainer, horizontalScrollBox } from './HomeCenterStyles'
import {getPlaylist, getSpotifyAcessToken} from '../Network/clients'

import MusicBox from '../components/MusicBox/MusicBox'

import { useLoaderData } from 'react-router-dom'

const HomeCenter = () => {
  const [activeChipsArr, addToActiveChipArr] = useState([])
  const [topSongsArr, setTopSongs] = useState([]) //for storing returned songs from the API

  const clientID = '6dc3f257b8a94a099d7c7f226ad92574'
  const clientSecret = 'c4d8988d539f4cc3a187b84162c45545'

  const handleChipClick = (genre) => {
    console.log(genre)
    addToActiveChipArr((value)=> console.log(value))
  }
  // useEffect(()=>{
  //   (async()=>{
  //     let topSongs = await getPlaylist('37i9dQZEVXbMDoHDwVN2tF','tracks')
  //     setTopSongs(topSongs.items)

      
  //   })() //IIFE
  // },[])

  const {items} = useLoaderData()


  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'20px', padding:'20px'}}>

                                                               {/* FILTER BOX */}
      <Box sx={fillterContainer}>
        {
          genres.map((genre,key) =>  <Chip key={key} icon={<HeadphonesIcon/>} label={genre} variant="outlined" onClick={() => handleChipClick(genre)}/>)
        }
      </Box>    
                                                                {/* home text*/}
      <Box sx={{display:"flex",alignItems:"flex-end",justifyContent:"space-between"}}>
        <Typography variant='h5' component='h1'>Popular Now</Typography>
        <Typography variant='p'>See details</Typography>
      </Box>

                                                                {/* Music cards */}
      <Box sx={horizontalScrollBox}>

        {
          items && items.map((item)=> 
                            <MusicCard 
                              key={item.track.id}
                              sx={{width: '180px', boxShadow: 0, flexShrink:"0"}} 
                              musicName={item.track.name} 
                              artistName={item.track.artists[0].name} 
                              duration="3.23"
                              backgroundImage={item.track.album.images[1].url !== undefined ? item.track.album.images[1].url : "https://th.bing.com/th/id/OIP.OTHx6upJeSBgJT-smbgXUwHaHa?pid=ImgDet&rs=1"}
                              linktForBtn={`?nowPlaying=${item.track.id}`}
                              canBeplayed={item.track.preview_url != null}
                            />)
        }
    
      </Box>
    </Box>
  )
}

export default HomeCenter