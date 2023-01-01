const horizontalScrollBox = {
    display:"flex",
    overflowX:"auto",
    scrollbarWidth: 'thin',
    gap:'10px',
    '&::-webkit-scrollbar': {
      width: '0.4em',
      height:'5px',
    },
    '&::-webkit-scrollbar-track': {
      background: "#f1f1f1",
    },
    '&::-webkit-scrollbar-track:hover': {
      bgcolor:"lightgray"
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'primary.main',
      position:'relative'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      bgcolor: 'primary.dark',
    }
}

const fillterContainer = {width:"100%",display:"flex",justifyContent:"center",gap:"10px",flexWrap:'wrap'}

export {horizontalScrollBox, fillterContainer}