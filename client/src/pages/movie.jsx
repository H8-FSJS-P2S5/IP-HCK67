import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovie } from "../features/actions";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { setMovie } from "../features/movieSlice";
import Swal from "sweetalert2";
import Search from "../component/search";
export default function Movie() {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movies.movies);
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovieList, setFilteredMovieList] = useState([]);

  useEffect(() => {
    dispatch(fetchDetailMovie());
    checkPremiumStatus();
  }, []);

  const checkPremiumStatus = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.get(
        `http://localhost:3000/users/status/premium/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setIsPremium(response.data.status !== "basic");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFavorite = async (id) => {
    try {
      const { response, status } = await axios.post(
        `http://localhost:3000/favorites/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (status === 200) {
        await Swal.fire({
          position: "top-center",
          icon: "success",
          title: `add movie successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(response.data, "menambahkan favorit");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const changeStatusUsertoPremium = async (userId, movieId) => {
    try {
      console.log("masuk change status");
      const { data } = await axios({
        method: "put",
        url: `http://localhost:3000/users/status/${userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      localStorage.removeItem("status");
      console.log(data, "dari card review");
      localStorage.setItem("status", data.status);
      navigate(`/movies`);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePremium = async (movieId) => {
    try {
      console.log("payment");
      const { data } = await axios({
        method: "POST",
        url: `http://localhost:3000/movies/upgrate`,
        headers: {
          authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      let userId = localStorage.getItem("id");

      window.snap.pay(data.token, {
        onSuccess: function (result) {
          changeStatusUsertoPremium(userId, movieId);
          localStorage.setItem("premium", true);
          setShowPremiumModal(false);
          setIsPremium(true);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePlay = async (id) => {
    // play
    if (!isPremium) {
      setShowPremiumModal(true);
    } else {
      try {
        const response = await axios.get(`http://localhost:3000/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        const movieData = response.data;

        if (movieData && movieData.trailer) {
          const trailer = movieData.trailer;
          window.open(trailer, "_blank");
        } else {
          console.error("Trailer film tidak ditemukan atau tidak lengkap.");
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  };

  const fetchMoreData = async (search = "") => {
    try {
      const response = await axios.get(
        `http://localhost:3000/movies?page=${movieList.length}&search=${searchQuery}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (response.data.length === 0) {
        setHasMore(false);
        return;
      }
      console.log(response, ">>re");

      if (search !== "") {
        dispatch(setMovie(response.data));
      } else {
        // dispatch(setMovie([]));
        dispatch(setMovie([...movieList, ...response.data]));
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // useEffect(() => {
  //   if (searchQuery) {
  //     setFilteredMovieList(
  //       movieList.filter((movie) => movie.title.includes(searchQuery))
  //     );
  //   }
  // }, [searchQuery]);

  useEffect(() => {
    console.log(searchQuery, ">>>sear ch");
    fetchMoreData(searchQuery);
  }, [searchQuery]);

  return (
    <>
      <InfiniteScroll
        dataLength={movieList.length}
        // dataLength={filteredMovieList.length}
        next={fetchMoreData}
        hasMore={hasMore}
        // loader={<h4>Loading...</h4>}
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4"
          style={{
            backgroundImage:
              'url("https://isquad.tv/wp-content/uploads/2018/08/Netflix-Background.jpg")',
          }}
        >
          <div className="col-span-full sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 flex justify-center mb-4">
            <Search onSearch={setSearchQuery} />
          </div>

          {movieList.map((el) => (
            <div
              key={el.id}
              className="w-full cursor-pointer rounded-lg bg-white shadow-md duration-150 hover:scale-105 opacity-90"
            >
              <img
                className="w-full h-auto rounded-lg object-cover object-center"
                src={el.image}
                alt="movies"
              />
              <p className="font-bold text-black font-serif m-2">{el.title}</p>
              <p className="text-black font-serif m-2">
                Rank <strong /> : {el.rank}
              </p>
              <p className="font-semibold text-black font-mono m-2">
                {el.description}
              </p>
              <button
                type="button"
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 "
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
      </InfiniteScroll>

      {/* MODAL */}
      {showPremiumModal && !isPremium && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6-6h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      You don't have a premium status yet.
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        You need to have a premium status to play movies. Please
                        upgrade to premium status to enjoy this feature.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    handlePremium();
                  }}
                >
                  Premium
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowPremiumModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
