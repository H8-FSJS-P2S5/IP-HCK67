import Login from "./pages/login";
import { createBrowserRouter, redirect } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Layout from './pages/layout'
import Movies from "./pages/movie";
import Register from "./pages/register";
import MoviesId from './pages/movieId'
import DataFav from "./pages/dataFav";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      const isLogin = localStorage.getItem("access_token");
      if (isLogin) {
        return redirect("/movies");
      } else {
        return null;
      }
    },
  },

  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) return redirect("/login");
      return null
    },
    children: [
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/movies/:id",
        element: <MoviesId />,
      },
      {
        path: "/favorites",
        element: <DataFav />,
      },
    ],
  },
]);
