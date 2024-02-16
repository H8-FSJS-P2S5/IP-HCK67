import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleOnSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Do you want add a New User?",
        showCancelButton: true,
        cancelButtonColor: "#E64935",
        confirmButtonText: "Yes",
        confirmButtonColor: "#FEEE93",
      });

      if (result.isConfirmed) {
        try {
          const { data } = await axios.post(
            "http://localhost:3000/register",
            formRegister,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            }
          );

          console.log(data, ">>res");

          if (data.id) {
            await Swal.fire({
              position: "top-center",
              icon: "success",
              title: `Thanks buddy ${data.email}`,
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/login");
          } else {
            console.error("register", data);
          }
        } catch (error) {
          console.error("register", error);
        }
      }
    } catch (error) {
      console.log(error, "registerpage jsx");
      throw error;
    }
  };

  const handleChangeRegister = (e) => {
    const { value, name } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  };
  return (
    <>
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage:
            'url("https://isquad.tv/wp-content/uploads/2018/08/Netflix-Background.jpg")',
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img
                src="https://png.pngtree.com/png-clipart/20230510/original/pngtree-straw-hat-anime-fashion-cosplay-tropical-illustration-image-png-image_9154644.png"
                width={150}
                alt="logo"
              />
              <h1 className="mb-2 text-2xl">HANSMOVE</h1>
              <span className="text-gray-300">Create your account first!</span>
            </div>
            <form onSubmit={handleOnSubmitRegister}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="fullName"
                  value={formRegister.fullName}
                  onChange={handleChangeRegister}
                  placeholder="Full Name"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="email"
                  value={formRegister.email}
                  onChange={handleChangeRegister}
                  placeholder="id@email.com"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  name="password"
                  value={formRegister.password}
                  onChange={handleChangeRegister}
                  placeholder="****"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-yellow-800  backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
