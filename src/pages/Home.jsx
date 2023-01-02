import React from 'react'
import { useState, useEffect, useRef} from 'react';

import NavBar from '../components/NavBar/NavBar'
import { Box } from '@mui/system';
import { Link, Outlet } from "react-router-dom";
import { Typography, CircularProgress, SwipeableDrawer, Button } from '@mui/material';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { valueToPercent } from '@mui/base';

import { accessToken, Search, search } from '../Network/clients';
import ArtistCard from '../components/ArtistCard/ArtistCard';

import GroupHeader from '../components/AutoCompleteStyledComponenets/GroupHeader';
import GroupItems from '../components/AutoCompleteStyledComponenets/GroupItems';

import { horizontalScrollBox } from './HomeCenterStyles';
import MusicBox from '../components/MusicBox/MusicBox';
import MusicCard from '../components/musicCard/MusicCard';

import { toMins, toSecs, biNum } from '../components/MusicBox/musicBoxUtilities';

import { useLoaderData } from 'react-router-dom';
import Draggable from 'react-draggable'

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const [inputValue, setInputValue] = useState('') //song that user is currently searching from
  const [suggestions, setSuggestions] = useState([''])
  const [loading, setLoading] = useState(false)
  const [autoSuggestOpen, setAutoSuggestOpen] = useState(false)

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  
  const [items, setItems] = useState([]) //for storing array thatll be used to construct the search section
  const homeData = useLoaderData()

  const [isDrawerOpen, setIsDrawerOpen] = useState(true)

  useEffect(()=>{
    (async() => {
        setLoading(true)
        let response = await search(inputValue)
        
        if(response.hasOwnProperty('artists')){
          setSuggestions(response)
        }
        setLoading(false)
      }
    )()
   
  },[inputValue])

  function handleInputChange({target:{value}}){
    setInputValue(value)
  }

  async function getItems(value){
    let itemsForConstructingUI = await Search(value || inputValue, 5)
    // console.log('itemsForConstructingUI', itemsForConstructingUI)
    setItems(itemsForConstructingUI)
  }

  const drawerWidth = '240px'
  const rightPaneWidth = '250px'
  return (
    <Box sx={{display:"flex",justifyContent:{xs:'left',sm:'right'}}}>
        <NavBar drawerWidth={drawerWidth}/>
        <Box sx={{width: {xs:'100%',sm:`calc(100% - ${drawerWidth})`,md:`calc(100% - ${drawerWidth} - ${rightPaneWidth})`},minHeight:'100vh',display:"flex",flexDirection:"column", position:'relative'}}>
            <Outlet />
            {!matches && <>
                 
                <SwipeableDrawer
                  anchor='bottom'
                  swipeAreaWidth={50}
                  open={isDrawerOpen}
                  disableSwipeToOpen={false}
                  onOpen={()=> setIsDrawerOpen(true)}
                  onClose={()=> setIsDrawerOpen(false)}
                >
               {/* right pane */}
              
                  <Box sx={{width:'100%', maxHeight:'90vh',padding:'10px'}}>
                    <Box>
                      <Typography variant='h6'>Search</Typography>
 
                      {/* Autocomplete search component */}
                      <Autocomplete
                        onInputChange={(event,newInputValue)=>{
                          setInputValue(newInputValue)
                          getItems(newInputValue)
                        }}  
                        clearOnEscape
                        disablePortal
                        value={inputValue}
                        id="combo-box-demo"
                        freeSolo
                        open={autoSuggestOpen}
                        onOpen={(() => setAutoSuggestOpen(true))}
                        onClose={((e) => setAutoSuggestOpen(false))}
                        onKeyDown={((e)=> {
                            if(e.key == 'Enter'){
                              // e.defaultMuiPrevented = true;
                              // console.log(e)
                              // getItems()
                            }

                        })}
                        getOptionLabel={(option) => option.name ? option.name : option}
                        filterOptions={(x) => x}
                        groupBy={(option) => option.type}
                        options={suggestions.artists ? suggestions.artists.items.concat(suggestions.tracks.items) : [{name:'No results'}]}
                        renderInput={(params) => 
                          <TextField 
                            {...params} 
                            label="Search"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment:loading && <CircularProgress size={20}/>
                            }}
                        />}
                        renderGroup={(params) => (
                          <li>
                            <GroupHeader>{params.group}</GroupHeader>
                            <GroupItems>{params.children}</GroupItems>
                          </li>
                        )}
                        renderOption={(props, option) => {
                          return (
                            <li {...props} key={option.id}>
                              {option.name}
                            </li>
                          );
                        }}
                      />
                    </Box>
                 
 
                 
                 <Box sx={{p:'10px 0px'}}>
                   {/* artisit container */}
                 {items.hasOwnProperty('artists') && <Typography color="primary" sx={{"fontWeight":'600'}}>Artists</Typography>}
                     <Box sx={{...horizontalScrollBox, mb: `${items.hasOwnProperty('artists') && '30px'}`,}}>
                       {
                         items.hasOwnProperty('artists') && items.artists.items.map((item) => 
                             <Link to={`/artist/${item.id}`}>
                               <ArtistCard key={item.id} ArtistName={item.name} imageLink={item.images.length > 0 && item.images[0].url}/>
                             </Link>
                         )
                       }
                     </Box>
 
                   {/* tracks Container */}
                   {items.hasOwnProperty('tracks') && <Typography color="primary" sx={{"fontWeight":'600'}}>Tracks</Typography>}
                   <Box sx={{...horizontalScrollBox, mb: `${items.hasOwnProperty('tracks') && '30px'}`}}>
                       {
                         items.hasOwnProperty('tracks') && items.tracks.items.map((item) => 
                           <MusicCard
                             key={item.id}
                             sx={{width: '180px', boxShadow: 0, flexShrink:"0"}} 
                             musicName={item.name}
                             artistName={item.artists[0].name}
                             duration={`${toMins(item.duration_ms)}:${biNum(toSecs(item.duration_ms))}`}
                             backgroundImage={item.album.images[0].url}
                             linktForBtn={`?nowPlaying=${item.id}`}
                             canBeplayed={true}
                           />
                         )
                       }
                     </Box>
 
                   {/* Now playing */}
                     <Box>
                       <Typography color="primary" sx={{"fontWeight":'600'}}>Now playing</Typography>
                       {homeData && !homeData.track.hasOwnProperty('error') &&  <MusicBox track={homeData.track}/>}
                     </Box>
                 </Box>
                  </Box>
              
                </SwipeableDrawer>
                <Box sx={{display:'flex', justifyContent:'center', position:'absolute', bottom:'0px', right:'0', left:'0', pb:'50px'}}>
                <Button variant='outlined' sx={{display:'inline-block'}} onClick={()=> setIsDrawerOpen(true)}>Search</Button>
              </Box>
              </>
            }
            
        </Box>
          
          {/* right pane */}
            {
              matches && 
                <Box sx={{width:`${rightPaneWidth}`, display:{sm:"none",xs:"none",md:"block",padding:'20px', zIndex:'3'}}}>
                <Typography variant='h6'>Search</Typography>

                {/* Autocomplete search component */}
                <Autocomplete
                  onInputChange={(event,newInputValue)=>{
                    setInputValue(newInputValue)
                    getItems(newInputValue)
                  }}  
                  clearOnEscape
                  disablePortal
                  value={inputValue}
                  id="combo-box-demo"
                  freeSolo
                  open={autoSuggestOpen}
                  onOpen={(() => setAutoSuggestOpen(true))}
                  onClose={((e) => setAutoSuggestOpen(false))}
                  onKeyDown={((e)=> {
                      if(e.key == 'Enter'){
                        // e.defaultMuiPrevented = true;
                        // console.log(e)
                        // getItems()
                      }

                  })}
                  getOptionLabel={(option) => option.name ? option.name : option}
                  filterOptions={(x) => x}
                  groupBy={(option) => option.type}
                  options={suggestions.artists ? suggestions.artists.items.concat(suggestions.tracks.items) : [{name:'No results'}]}
                  renderInput={(params) => 
                    <TextField 
                      {...params} 
                      label="Search"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment:loading && <CircularProgress size={20}/>
                      }}
                  />}
                  renderGroup={(params) => (
                    <li>
                      <GroupHeader>{params.group}</GroupHeader>
                      <GroupItems>{params.children}</GroupItems>
                    </li>
                  )}
                  renderOption={(props, option) => {
                    return (
                      <li {...props} key={option.id}>
                        {option.name}
                      </li>
                    );
                  }}
                />

                
                <Box sx={{p:'10px 0px'}}>
                  {/* artisit container */}
                {items.hasOwnProperty('artists') && <Typography color="primary" sx={{"fontWeight":'600'}}>Artists</Typography>}
                    <Box sx={{...horizontalScrollBox, mb: `${items.hasOwnProperty('artists') && '30px'}`,}}>
                      {
                        items.hasOwnProperty('artists') && items.artists.items.map((item) => 
                            <Link to={`/artist/${item.id}`}>
                              <ArtistCard key={item.id} ArtistName={item.name} imageLink={item.images.length > 0 && item.images[0].url}/>
                            </Link>
                        )
                      }
                    </Box>

                  {/* tracks Container */}
                  {items.hasOwnProperty('tracks') && <Typography color="primary" sx={{"fontWeight":'600'}}>Tracks</Typography>}
                  <Box sx={{...horizontalScrollBox, mb: `${items.hasOwnProperty('tracks') && '30px'}`}}>
                      {
                        items.hasOwnProperty('tracks') && items.tracks.items.map((item) => 
                          <MusicCard
                            key={item.id}
                            sx={{width: '180px', boxShadow: 0, flexShrink:"0"}} 
                            musicName={item.name}
                            artistName={item.artists[0].name}
                            duration={`${toMins(item.duration_ms)}:${biNum(toSecs(item.duration_ms))}`}
                            backgroundImage={item.album.images[0].url}
                            linktForBtn={`?nowPlaying=${item.id}`}
                            canBeplayed={true}
                          />
                        )
                      }
                    </Box>

                  {/* Now playing */}
                    <Box>
                      <Typography color="primary" sx={{"fontWeight":'600'}}>Now playing</Typography>
                      {homeData && !homeData.track.hasOwnProperty('error') &&  <MusicBox track={homeData.track}/>}
                    </Box>
                </Box>
              </Box>
            }
    </Box>
  )
}

export default Home