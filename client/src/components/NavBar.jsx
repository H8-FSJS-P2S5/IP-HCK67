//import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling
import axios from 'axios';


function NavBar() {

const handleSubscribe = async(e)=>{
  e.preventDefault(); // Prevent the default behavior of the link

  try {
    const response = await axios.post('http://localhost:3000/midtrans-token',{})
    
    console.log(response, "data>>>>>")

    window.location.href = response.data.redirect_url
  } catch (error) {
    console.log(error)
  }
}



  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>

        <li className="nav-item">
          <Link to="/world-news" className="nav-link">World News</Link>
        </li>

        <li className="nav-item">
          <Link to="/indonesian-news" className="nav-link">Indonesian News</Link>
        </li>

        <li className="nav-item">
          <Link onClick={handleSubscribe} className="nav-link">Subscribe</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
