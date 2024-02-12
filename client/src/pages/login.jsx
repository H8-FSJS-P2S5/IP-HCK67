import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  console.log("<<<<<>>>>>>>>");
  console.log("masuk login");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("login nih jsx", formLogin);
      const { data } = await axios.post(
        "http://localhost:3000/login",
        formLogin
      );

      console.log(data, "login on submit");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("status", data.status);
      console.log("masuk");
      navigate("/movies");
      console.log("masuk2");
    } catch (error) {
      console.log(error, "loginpage jsx");
      throw error;
    }
  };

  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/google-login",
        null,
        {
          headers: {
            google_token: response.credential,
          },
        }
      );
      console.log(data, "data google login di login jsx");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("status", data.status);
      console.log("masuk 1");
      navigate("/movies");
      console.log("masuk2<");
    } catch (error) {
      console.log(error, "login google");
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "339593096588-l90btd7llmhv3fhnougfug1nhb5uia7b.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <>
      {/* component */}
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
              <span className="text-gray-300">Fill Require, Dude!</span>
            </div>
            <form action="" onSubmit={handleOnSubmit}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  defaultValue={formLogin.email}
                  placeholder="id@email.com"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  onChange={handleChange}
                  defaultValue={formLogin.password}
                  placeholder="*********"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                  onClick={() => {
                    navigate("/movies")
                  }}
                > 
                  Sign Up
                </button>
              </div>
              <div
                className="flex items-center justify-center"
                style={{ margin: "10px" }}
                id="buttonDiv"
              ></div>

              <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                Don't have an account yet?
                <Link
                  className="font-semibold text-black-500 transition-colors hover:text-blue-700"
                  to="/register"
                >
                  <br />
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
