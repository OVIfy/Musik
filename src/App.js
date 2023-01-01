import logo from './logo.svg';
import './App.css';
import First from './first';
import Home from './pages/Home';
import HomeCenter from './pages/HomeCenter'
import Error from './pages/Error'
import Favourites from './pages/Favourites';
import Artist from './pages/Artist';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import customTheme from './theme';

import { homeCenterLoader, artistLoader, homeLoader } from './Network/clients';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Playlist from './pages/Playlist';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement: <Error/>,
    loader: homeLoader,
    children:[
      {
        path: '/',
        element: <HomeCenter/>,
        loader: homeCenterLoader
      },
      
      {
        path:'favourites',
        element: <Favourites/>
      },

      {
        path:'artist',
        element:<Artist/>
      },

      {
        path:'artist/:artistId',
        element: <Artist/>,
        loader: artistLoader
      },

      {
        path:'playlist',
        element: <Playlist/>
      }
    ]
  },

]);

function App() {
  return (

    <div>
      <ThemeProvider theme={customTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
