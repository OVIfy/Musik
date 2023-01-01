import React from 'react'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'

const ArtistCard = ({imageLink, ArtistName, sx}) => {
  return (
    <Card
        sx={{ boxShadow:0, backgroundColor:'transparent', width:'70px', flexShrink:"0"}}
    >
        <CardMedia
            component="img"
            image={imageLink || 'https://media.istockphoto.com/id/476085198/photo/businessman-silhouette-as-avatar-or-default-profile-picture.jpg?b=1&s=170667a&w=0&k=20&c=cVOZ3OYMmZQt9_G4TXXiCM3a3oJQlJ-FLGdVO0rCPpY='}
            alt="artist picture"
            sx={{flexGrow:"0",  height:'70px',}}
        />
        <CardContent sx={{padding:'0px'}}>
            <Typography sx={{'fontWeight':'700', textAlign:'center', display:'block', padding:'0px'}} variant='caption'>{ArtistName.length > 18 ? ArtistName.substring(0,18) + '...' : ArtistName || 'Artist'}</Typography>
        </CardContent>
    </Card>
  )
}

export default ArtistCard