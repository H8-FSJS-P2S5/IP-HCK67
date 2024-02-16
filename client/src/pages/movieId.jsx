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
          </div>
        </div>
      </div>

      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
    </>
  );
}
