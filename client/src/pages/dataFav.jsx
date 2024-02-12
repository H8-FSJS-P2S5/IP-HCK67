import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function DataFav() {
  const { id } = useParams();
  const [favById, setFavById] = useState([]);

  const fetchFavById = async () => {
    console.log("masuk data fav");
    try {
      console.log(id, "masuk user fav");

      const response = await axios.get(`http://localhost:3000/favorites`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(response.data, "data user fav");
      setFavById(response.data);
    } catch (error) {
      console.error("Error fetching fav data", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    fetchFavById();
  };

  useEffect(() => {
    fetchFavById();
    console.log(localStorage.getItem("id"), ">>id");
  }, [id]);

  return (
    <>
      <div className="m-10">
        <h2 className="font-extrabold text-center text-2xl">Favorite</h2>
      </div>

      <div className="flex flex-wrap justify-center">
        {favById?.map((el) => (
          <div
            key={el.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
          >
            <div className="h-auto border border-black hover:bg-blue-200 transition ease-in-out cursor-pointer px-4 py-6 rounded-xl relative flex flex-col justify-between">
              <div>
                <img src={el.image} alt="image" />
                <p className="font-thin text-white whitespace-pre-line break-words"></p>
                <p className="font-bold text-lg flex items-center sm:mb-0">
                  {el.title}
                </p>
                <p style={{ fontStyle: "italic" }}>{el.description}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <p style={{ fontStyle: "italic" }}>{el.year}</p>
                {localStorage.getItem("id") == el.UserId && (
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="text-red-600 bg-white border border-red-600 focus:outline-none hover:bg-red-100 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-red-600 dark:hover:bg-red-700 dark:hover:border-red-600 dark:focus:ring-red-700"
                      onClick={() => {
                        handleDelete(el.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
