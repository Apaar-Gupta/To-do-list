import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyle.css";
import AuthServices from "../../Services/AuthServices.js";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../Utils/ErrorMessage.js";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault(); // MUST be first

    try {
      const data = { email, password };
      const res = await AuthServices.loginUser(data);
      toast.success(res.data.message);
      
      
        navigate("/home");
        localStorage.setItem("todoapp", JSON.stringify(res.data));
        console.log("Login success:", res.data);
    } catch (err) {
        toast.error(getErrorMessage(err));
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="form-container">
      
      <form className="form" onSubmit={loginHandler}>
        <div className="mb-3">
          <i className="fa-solid fa-circle-user"></i>
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-bottom">
          <p className="text-center">
            Not a user? Please
            <Link to="/register"> Register</Link>
          </p>

          {/* 👇 NO onClick */}
          <button type="submit" className="login-btn">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
