import axios from "axios";

import { setMovie } from "./movieSlice";


export const fetchDetailMovie = () => {

    return async (dispatch) => {
        // const dispatch = useDispatch()
        try {
          const accessToken = localStorage.getItem("access_token");
          if (!accessToken) {
              console.error("Access token is missing.");
              return;
          }

          const response = await axios.get("http://localhost:3000/movies", {
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });

          console.log('Request successful:', response.data);
          dispatch(setMovie(response.data));
        } catch (error) {
          console.log(error);
          throw error;
        }
    }
   
  };