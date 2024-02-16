import React from 'react'
import ReactDOM from 'react-dom/client'
import NavBar from './components/NavBar.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import './index.css'
import NewsList from './components/NewsList.jsx';
import NewsDetail from './components/NewsDetail.jsx';
import WorldNews from './components/WorldNews.jsx';
import WorldNewsDetail from './components/WorldNewsDetail.jsx';
import IndonesianNews from './components/IndonesianNews.jsx';
import IndonesianNewsDetail from './components/IndonesianNewsDetail.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <div>
      <NavBar/>
      <NewsList/>
    </div>
  },
  {
    path: "/world-news",
    element: 
    <div>
      <NavBar/>
      <WorldNews/>
    </div>
  },
  

  {
    path: "/news-detail/:id",
    element: 
    <div>
      <NavBar/>
      <NewsDetail/>
    </div>
  },


  {
    path: "/world-news-detail/:id",
    element: 
    <div>
      <NavBar/>
      <WorldNewsDetail/>
    </div>
  },

  {
    path: "/indonesian-news",
    element: 
    <div>
      <NavBar/>
      <IndonesianNews/>
    </div>
  },
  

  {
    path: "/indonesian-news-detail/:id",
    element: 
    <div>
      <NavBar/>
      <IndonesianNewsDetail/>
    </div>
  }


  
  
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />

    {/* <App /> */}
  </React.StrictMode>,
)
