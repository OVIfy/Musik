import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { Grow, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import {CircularProgress} from '@mui/material';

import Zoom from '@mui/material/Zoom';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { PlaylistAddCheck, PlaylistAdd, FavoriteBorderOutlined} from '@mui/icons-material';

import {Menu, MenuItem }from '@mui/material';
import MusicCardMenuStyle from './musicCardMenuStyle';
let width = ''



const bull = (
    <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.9)' }}
  >
    •
  </Box>
)

export default function MusicCard({sx, musicName, artistName, duration, backgroundImage, linktForBtn, canBeplayed}){

  const musicNameElement = useRef()
  const [isMouseOn, setIsMouseOn] = useState(false)
  const [refAvaillable, setRefAvaillable] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  let musicNameStyle = {
    fontWeight : "900",
    overflowY:"hidden",
    whiteSpace:'nowrap',
    '@keyframes slide':{
      '0%':{
        transform : 'translateX(0%)',
      },
      '48%':{
        transform : 'translateX(-99%)',
        opacity:'1'
      },
      '49%':{
        opacity: '0',
        transform : 'translateX(-100%)'
      },
      '50%':{
        opacity: '0',
        transform : 'translateX(100%)'
      },
      '51%':{
        opacity: '0',
        transform : 'translateX(99%)'
      },
      '52%':{
        opacity: '1'
      },
      '75%':{
        transform : 'translateX(0%)'
      },
      '100%':{
        transform : 'translateX(0%)'
      }
    } ,
    '&:hover':{
      'cursor':'pointer',
      'animation':`${musicNameElement.current && musicNameElement.current.innerText.length > 17 && 'slide 8s ease-in infinite'}`
    }
  }

  useEffect(()=>{
    
    musicNameElement.current && (function(){
      if(musicNameElement.current.innerText.length > 17){
        musicNameElement.current.onmouseenter = (e) => {
          musicNameElement.current.innerHTML = `${musicName}`
          
        }
  
        musicNameElement.current.onmouseleave = (e) => {
          musicNameElement.current.innerHTML = `${handleMusicName(musicName)}`
        }
      }

      setRefAvaillable(true)
  
    })()

  },[musicNameElement])

  
  
  

  const handleMusicName = (name) => {
    return name.length >= 17 ? name.substring(0,15) + '...' : name
  }
  

  return (
    <Zoom in={true}>
    <Card sx={sx}>
      <div style={{position:'relative'}} 
        onMouseEnter={(e)=> setIsMouseOn(true)}
        onMouseLeave={(e)=> setIsMouseOn(false)}>
      <CardMedia
        component="img"
        image={backgroundImage}
        alt="green iguana"
        sx={{borderRadius:'5px', boxSizing:"border-box",height: '180px', transition: 'all 1s ease-in-out' ,'&:hover':{transform:'scale(1.04)', cursor:'pointer'}}}
      />
        {isMouseOn && <Box sx={{position:'absolute', top:'0px', bottom:'0px', left:'0px', right:'0px', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'rgba(144,202,249,0.8)'}}>
          <Grow in={true} timeout={1000}>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <PlaylistAdd color='secondary'/>
            </IconButton>
          </Grow>
          <Grow in={true} timeout={2000}>
            <IconButton>
                <FavoriteBorderOutlined color='secondary'/>
            </IconButton>
          </Grow>
         
        </Box>}

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {setAnchorEl(null); setIsMouseOn(false)}}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={() => setAnchorEl(null)} sx={MusicCardMenuStyle}>Profile</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)} sx={MusicCardMenuStyle}>My account</MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)} sx={MusicCardMenuStyle}>Logout</MenuItem>
            </Menu>


      </div>
        <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Zoom in={true} style={{transitionDelay:'1s'}}>
              <CardContent sx={{display:'flex',pl:'0px',pr:'0px',flexDirection:"column"}}>
                  <Typography ref={musicNameElement} sx={refAvaillable && musicNameStyle} variant='caption'>{handleMusicName(musicName)}</Typography>
                  <Typography variant='caption' sx={{fontSize:10}}>{artistName} {bull} {duration}</Typography>
              </CardContent>
            </Zoom>
            <Zoom in={true} style={{transitionDelay:'1s'}}>
              <Link to={linktForBtn || '/'}>
                {canBeplayed && <CardActions sx={{display:'flex',pl:'0px',pr:'0px',position:"relative",justifyContent:"center",'&:hover':{transform:'scale(1.04)', cursor:'pointer'}}}>
                    <CircularProgress variant="determinate" value={100} thickness={1}/>
                    <Box sx={{position:"absolute"}}>
                        <PlayArrowIcon/>
                    </Box>
                </CardActions>}
              </Link>
            </Zoom>
        </Box>
    </Card>
    </Zoom>
  );
}