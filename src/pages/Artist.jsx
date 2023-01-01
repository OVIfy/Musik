import { Card, CardMedia, Typography, Box } from '@mui/material';
import React from 'react'
import musicBoxImage from './eagle.jpg';
import { useLoaderData } from 'react-router-dom';

import TrackCard from '../components/trackCard/TrackCard';

const Artist = () => {
  const artisitDetails = useLoaderData()
  return (
    <>
      <Box sx={{background:'linear-gradient(#90caf9 0 1%, transparent 40% 100%)', minHeight:'100%'}}>
        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', mt:'64px', position:'fixed', left:'0px', right:'0px'}}>
          <Card sx={{width:'150px', height:'150px', border:'20px solid #90caf9', boxSizing:"content-box", }}>
            <CardMedia
            component="img"
            alt='artists picture'
            src={artisitDetails.images.length > 1 ? artisitDetails.images[0].url : 'https://media.istockphoto.com/id/476085198/photo/businessman-silhouette-as-avatar-or-default-profile-picture.jpg?b=1&s=170667a&w=0&k=20&c=cVOZ3OYMmZQt9_G4TXXiCM3a3oJQlJ-FLGdVO0rCPpY='}/>
          </Card>
          <Typography sx={{mt:'16px'}}>{artisitDetails.name}</Typography>
        </Box>

                                          {/* bottom box */}
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', m:'384px 0px 64px 0px'}}>

          {
            artisitDetails.tracks.map((item, index) => <TrackCard key={item.id} linkForBtn={`?nowPlaying=${item.id}&artist=true&index=${index}`} songName={item.name} imageLink={item.album.images && item.album.images[0].url} canBePlayed={item.preview_url != null}/>)
          }
        </Box>

        
      </Box>
    </>
  )
}

export default Artist