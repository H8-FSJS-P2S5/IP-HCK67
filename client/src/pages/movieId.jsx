import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function MoviesId() {
  const { id } = useParams();
  const [detailFav, setDetailReview] = useState();
  const navigate = useNavigate();
  const fetchDetailReview = async () => {
    try {
      console.log("masuk");
      // id buat edit dibawah

      const response = await axios.get(`http://localhost:3000/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data, "card review");
      setDetailReview(response.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const changeStatusUsertoPremium = async (userId) => {
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
      navigate(`/favorites  /${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePremium = async () => {
    try {
      console.log("masuk payment");
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
          changeStatusUsertoPremium(userId);
        },
      });
    } catch (error) {
      console.log(error);

      // alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchDetailReview();
  }, [id]);

  return (
    <>
      <div className="container-review m-10">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img src={detailFav?.image} alt="Poster" />
          </figure>
          <div className="card-body">
            <h2 className="card-title" style={{ fontFamily: "Helvetica" }}>
              {detailFav?.title} - {detailFav?.id}
            </h2>
            <p>
              {" "}
              <strong>Release</strong> : {detailFav?.year}
            </p>
            <p>Description: {detailFav?.description}</p>
            <p>Genre: {detailFav?.genre}</p>
            <p>Director: {detailFav?.director}</p>
            <p>Writers: {detailFav?.writers}</p>
            <div className="card-actions justify-end">
              <button
                type="button"
                // pake onlick handlepayment, jangan pake link to
                onClick={() => {
                  // console.log("logout navbar");
                  handlePremium();
                }}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <>Get Premium!</>
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
    </>
  );
}
