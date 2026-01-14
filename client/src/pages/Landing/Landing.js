
import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../assests/images/hero.jpg";
import "./Landing.css";
const Landing = () => {
  return (
    <div className="hero">
      <div className="intro-text">
        <h1>
          <span className="tagline1">Organize work and life</span> <br />
        </h1>
        <p>
  Turn your thoughts into tasks in seconds.
  Stay organized. Stay productive.
</p>

        <Link className="btn red" to="/register">
          Register Now!
        </Link>
        <Link className="btn blue" to="/login">
          Login
        </Link>
      </div>
      <div className="">
        <img src={Hero} alt="heroimage" width={"100%"} height={515} />
      </div>
    </div>
  );
};

export default Landing;
