import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';

const navBarItems = [
    {
        text:"Home",
        icon: <HomeIcon/>,
        id: 0,
        category:"features",
        link: '/'
    },

    // {
    //     text:"Discover",
    //     icon: <ExploreIcon/>,
    //     id: 1,
    //     category:"features",
    //     link: '/discover'
    // }, 

    // {
    //     text:"Trending",
    //     icon: <BarChartIcon/>,
    //     id: 2,
    //     category:"features",
    //     link: '/trending'
    // },
    
    // {
    //     text:"My Playlist",
    //     icon: <LibraryMusicIcon/>,
    //     id: 3,
    //     category: "collection",
    //     link:'/playlist'
    // },

    // {
    //     text:"Artist",
    //     icon: <PeopleIcon/>,
    //     id: 4,
    //     category: "collection",
    //     link:'/artist'
    // },

    // {
    //     text:"Favourites",
    //     icon: <FavoriteIcon/>,
    //     id: 5,
    //     category: "library",
    //     link:'/favourites'
    // },
]

export default navBarItems;