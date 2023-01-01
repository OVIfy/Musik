import { Card, CardMedia, Typography, Box, CardContent, CardActions } from '@mui/material';
import React from 'react';
import musicBoxImage from './eagle.jpg';
import { useState } from 'react';

import {CircularProgress} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {FavoriteBorderRounded, Favorite} from '@mui/icons-material';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';

const TrackCard = ({songName, duration, imageLink, linkForBtn, canBePlayed}) => {
    const [hovered, SetHovered] = useState(false)
    const [favorite, setFavorite] = useState(false)
  return (
    <Card 
        onMouseEnter={(e)=> SetHovered(true)}
        onMouseLeave={(e) => SetHovered(false)}
        sx={{ position:'relative', width:'80%', p:{md:'0px 64px', sm:'0px 16px'}, boxShadow:1, background:'linear-gradient(45deg, #90caf9, transparent)', backgroundColor:{sm:'white', xs:'white', md:'transparent'} ,transition:'all 0.2s ease-in', '&:hover':{boxShadow:0, m:'8px 0px', transform:'scale(0.99)', backgroundColor:'white'}}}>
    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <CardMedia
            sx={{width:'50px', height:'60px'}}
            component="img"
            alt='artists picture'
            src={imageLink || musicBoxImage }/>
        <CardContent sx={{padding:'0px 8px', display:'flex', justifyContent:'space-between', width:'70%'}}>
            <Typography sx={{fontSize:{md:'13px', sm:'10px', xs:'10px'}}}>{songName || 'As it was'}</Typography>
            <Typography>{duration || '3:32'}</Typography>
        </CardContent>   
        <CardActions sx={{display:'flex',pl:'0px',pr:'0px',position:"relative",justifyContent:"center",'&:hover':{transform:'scale(1.04)', cursor:'pointer', justifySelf:'right'}}}>
            {canBePlayed && <Link to={linkForBtn || '/'}>
                <CircularProgress variant="determinate" value={100} thickness={1}/>
                <Box sx={{position:"absolute", right:'0px', top:'0px', bottom:'5px', left:'0px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <PlayArrowIcon/>
                </Box>
            </Link>}
            {hovered && 
                <Slide direction="up" in={true} mountOnEnter unmountOnExit onClick={(e) => setFavorite(!favorite)}>
                    {favorite? <Favorite    color='primary' sx={{position:'absolute', right:'-30px'}} />  :<FavoriteBorderRounded  color='primary' sx={{position:'absolute', right:'-30px'}} />}
                </Slide>
            }

        </CardActions>
    </Box>
  </Card>
  )
}

export default TrackCard