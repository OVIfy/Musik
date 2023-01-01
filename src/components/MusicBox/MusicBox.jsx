import React, { useEffect } from 'react'
import { Card, CardActions, CardMedia, CircularProgress, IconButton, Slider } from '@mui/material'
import {Button, Typography} from '@mui/material';
import { useRef, useState } from 'react';
import { StopCircleRounded , PauseRounded, PlayArrowRounded, FastForwardRounded, FastRewindRounded, StopRounded, SkipNext, SkipPrevious } from '@mui/icons-material';

import { biNum, toMins, toSecs } from './musicBoxUtilities';

import song from './song.mp3';
import musicBoxImage from './eagle.jpg';
import { Box, height } from '@mui/system';

const buttonsStyle = {
    transform: 'translateY(300px)',
    '@keyframes fowardBtn':{
        from:{
            transform : 'translateY(300px)'
        },
        to:{
            transform : 'translateY(0px)'
        }
    },
    '@keyframes pauseBtn':{
        from:{
            transform : 'translateY(300px)'
        },
        to:{
            transform : 'translateY(0px)'
        }
    },'@keyframes stopBtn':{
        from:{
            transform : 'translateY(300px)'
        },
        to:{
            transform : 'translateY(0px)'
        }
    },'@keyframes reverseBtn':{
        from:{
            transform : 'translateY(300px)'
        },
        to:{
            transform : 'translateY(0px)'
        }
    }, '@keyframes prevBtn':{
        from:{
            transform : 'translateY(300px)'
        },
        to:{
            transform : 'translateY(0px)'
        }
    }, '@keyframes nextBtn':{
        from:{
            transform : 'translateY(300px)'
        },
        to:{
            transform : 'translateY(0px)'
        }
    }
}

const MusicBox = ({imageLink, track, className, list, currentSongIndex}) => {
    const [isPaused, setIsPaused] = useState(false)
    const [isMouseOnPlayer, setIsMouseOnPlayer] = useState(false)
    const [songDurationInPercentage, setSongDurationInPercentage] = useState(0)

    const pauseBtn = useRef()
    const audioElement = useRef(null)
    const durationDisplay = useRef(null)
    const cardOverlay = useRef(null)

    let timerID = 0


    useEffect(()=>{
      if(pauseBtn.current ){
            pauseBtn.current.onclick = (e) => {
                audioElement.current.pause()

                isPaused? audioElement.current.play() : audioElement.current.pause()
                setIsPaused(!isPaused)
            }

            timerID = setInterval(()=>{
                if(durationDisplay.current){
                    durationDisplay.current.innerText = `${toMins(audioElement.current.currentTime)}:${biNum(toSecs(audioElement.current.currentTime))} / ${toMins(audioElement.current.duration)}:${biNum(toSecs(audioElement.current.duration))}`
                }
                setSongDurationInPercentage(audioElement.current.currentTime/audioElement.current.duration * 100)
            },500)

        audioElement.current.onplay = (e) => {
          setIsPaused(false)
        }

        audioElement.current.onended = (e) => {
           setIsPaused(true)
        }

        }
        cardOverlay.current.addEventListener('mouseenter',(e)=>{
            setIsMouseOnPlayer(true)
        })
        cardOverlay.current.onmouseleave = (e) => {
            setIsMouseOnPlayer(false)
        }

      return () => {
        clearInterval(timerID)
      }
    },[isPaused])


  return (
     <>
     <Card
        className={className}
        sx={{ boxShadow:0, backgroundColor:'transparent', width:'100%', height:'300px', position:'relative'}}
    >
        <CardMedia
            component="img"
            image={track.album.images.length > 1 && track.album.images[0].url || 'https://i.scdn.co/image/ab67616d00001e02f2d2adaa21ad616df6241e7d'}
            alt="artist picture"
            sx={{flexGrow:"0"}}
        ></CardMedia>
        <CardActions
            sx={{backgroundColor:'rgba(0,0,0,0.5)'}}
        >
            <div ref={cardOverlay}style={isMouseOnPlayer?{position:'absolute', top:'0px', left:'0px', right:'0px', bottom:'0px', backgroundColor:'rgba(0,0,0,0.5)'} : {position:'absolute', top:'0px', left:'0px', right:'0px', bottom:'0px'} }>
                <div style={{position:'absolute',right:'0px', top:'0px', bottom:'0px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                    <IconButton color='secondary' sx={isMouseOnPlayer? {...buttonsStyle,animation:'nextBtn 0.5s cubic-bezier(0.1, 0.1, 0.7, 0.7) forwards'} : buttonsStyle}><SkipNext/></IconButton>
                    <IconButton color='secondary' sx={isMouseOnPlayer? {...buttonsStyle,animation:'fowardBtn 0.5s cubic-bezier(0.1, 0.1, 0.7, 0.7) forwards', animationDelay:'0.2s'} : buttonsStyle}><FastForwardRounded/></IconButton>
                    <IconButton ref={pauseBtn} sx={isMouseOnPlayer? {...buttonsStyle,animation:'pauseBtn 0.5s cubic-bezier(0.1, 0.1, 0.7, 0.7) forwards', animationDelay:'0.4s'} : buttonsStyle}>{!isPaused? <PauseRounded color='secondary'/> : <PlayArrowRounded color='secondary'/>} </IconButton> 
                    <IconButton color='secondary' sx={isMouseOnPlayer? {...buttonsStyle,animation:'stopBtn 0.5s cubic-bezier(0.1, 0.1, 0.7, 0.7) forwards', animationDelay:'0.6s'} : buttonsStyle}><StopRounded/></IconButton>
                    <IconButton color='secondary' sx={isMouseOnPlayer? {...buttonsStyle,animation:'reverseBtn 0.5s cubic-bezier(0.1, 0.1, 0.7, 0.7) forwards', animationDelay:'0.8s'} : buttonsStyle}><FastRewindRounded/></IconButton>
                    <IconButton color='secondary' sx={isMouseOnPlayer? {...buttonsStyle,animation:'prevBtn 0.5s cubic-bezier(0.1, 0.1, 0.7, 0.7) forwards', animationDelay:'1s'} : buttonsStyle}><SkipPrevious/></IconButton>
                    
                </div>

                {
                    isMouseOnPlayer && 
                    <>
                    <div style={{position:'absolute', bottom:'0px', left:'0px', right:'0px', padding:'10px 20px', display:'flex', gap:'20px', alignItems:'center', justifyContent:'center'}}>
                        <Slider 
                            size='small' 
                            value={songDurationInPercentage}
                            onChange={(e,value)=>{setSongDurationInPercentage(value); audioElement.current.currentTime = value/100 * audioElement.current.duration}}
                            sx=
                            {{
                                '& .MuiSlider-thumb':{
                                    border:'1px solid white'
                                },
                                '& .MuiSlider-track':{
                                    border:'2px solid white',
                                    height:'1px'
                                },
                                '& .MuiSlider-rail':{
                                    border:'2px solid white',
                                    backgroundColor:'white',
                                    height:'1px'

                                }
                            }}
                        />
                        <Typography ref={durationDisplay} color='secondary' sx={{whiteSpace:'nowrap', fontStyle:'italic', fontSize:10,'&:hover':{cursor:'pointer', color:'#90caf9'}}}>{''}</Typography>
                    </div>
                    </>
                }

            </div>
            {!isMouseOnPlayer && <div style={{marginLeft:'0px', position:'absolute',bottom:'0px','backgroundColor':'rgba(0,0,0,0.5)', left:'0px', right:'0px', display:'flex', justifyContent:'space-between', padding:'10px'}}>
                <div>
                    <Typography color="secondary" sx={{fontStyle:'italic','&:hover':{cursor:'pointer',color:'#90caf9'}}}>{track.name || 'song name'}</Typography>
                    <Typography  color="secondary" variant='caption' sx={{fontStyle:'italic', fontSize:10,'&:hover':{cursor:'pointer', color:'#90caf9'}}}>{track.artists[0].name || 'artist name'}</Typography>
                </div>
                <div style={{display:'flex', alignItems:'center', position:'relative'}}>
                    <CircularProgress thickness={1}  color="secondary" variant='determinate' value={songDurationInPercentage}/>
                    <IconButton color="secondary" sx={{position:'absolute'}}><StopRounded/></IconButton>
                </div>
            </div>}
           
        </CardActions>
    </Card>
    <audio ref={audioElement} src={track.preview_url && track.preview_url} controls style={{display:'none'}} autoPlay/>
    </> 
  )
}

export default MusicBox