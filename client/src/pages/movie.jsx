import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovie } from "../features/actions";
import axios from "axios";

export default function Movie() {
  const navigate = useNavigate();
  const movieList = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailMovie());
  }, []);

  const handleFavorite = async (id) => {
    try {
      console.log("masuk");

      const response = await axios.post(
        `http://localhost:3000/favorites/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log(response.data, "add favvvvvvvvvvvvvvvvvvvvv");
      setDetailReview(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handlePlay = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/movies/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      console.log(response.data, "handle play <<<<<<<<<<<<<<<");

      const movieData = response.data.data;
      const trailer = movieData.trailer_embed_link;

      window.open(trailer, "_blank");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <>
      <div
        className="flex flex-wrap justify-center m-3"
        style={{
          backgroundImage:
            'url("https://isquad.tv/wp-content/uploads/2018/08/Netflix-Background.jpg")',
        }}
      >
        {movieList.map((el) => (
          <div
            key={el.id}
            className="w-full sm:w-72 md:w-96 lg:w-80 xl:w-96 cursor-pointer rounded-lg bg-white p-2 m-2 shadow duration-150 hover:scale-105 hover:shadow-md opacity-90"
          >
            <img
              className="w-full h-auto rounded-lg object-cover object-center"
              src={el.image}
              alt="movies"
            />
            <p className="font-bold text-black font-serif m-2">{el.title}</p>
            <p className="text-black font-serif m-2">
              {" "}
              Rank
              <strong /> : {el.rank}
            </p>
            <p className="font-semibold text-black font-mono m-2">
              {el.description}
            </p>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <Link to={`/movies/${el.id}`}>Detail</Link>
            </button>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => {
                handleFavorite(el.id);
              }}
            >
              Add Movie
            </button>
            <button
              type="button"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => {
                handlePlay(el.id);
              }}
            >
              Play
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
