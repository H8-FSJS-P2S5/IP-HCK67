import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar bg-black">
        <div className="navbar-start">
          <Link className="btn btn-ghost text-xl" to="/favorites">
            FAV
          </Link>
        </div>
        <div className="navbar-center">
          <Link className="btn btn-ghost text-xl" to="/movies">
            HANSMOVE
          </Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://www.mordeo.org/files/uploads/2021/02/Sydney-Sweeney-In-Yellow-Dress-2021-Photoshoot-4K-Ultra-HD-Mobile-Wallpaper-scaled.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <button
                onClick={() => {
                  // console.log("logout navbar");
                  localStorage.removeItem("access_token");
                  localStorage.removeItem("id");
                  localStorage.removeItem("status");
                  navigate("/login");
                }}
              >
                <a>Sign Out</a>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
