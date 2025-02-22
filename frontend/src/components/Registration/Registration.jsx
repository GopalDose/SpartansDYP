import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Registration.css";

function Registration() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making a request

    const endpoint = isLogin ? "/login" : "/";
    const url = `http://localhost:4137/api/users${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem("userId", data.data._id);
        localStorage.setItem("isLoggedIn", "true");

        toast.success(
          isLogin ? "Login successful!" : "Registration successful!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        // Show error toast
        toast.error(data.message || "Something went wrong", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Server error, please try again later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setError("Server error, please try again later.");
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="content">
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex-column">
            <h2 className="card-title">{isLogin ? "Login" : "Register User"}</h2>
          </div>

          {!isLogin && (
            <>
              <div className="flex-column">
                <label>Name</label>
              </div>
              <div className="inputForm">
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  disabled={isLogin}
                />
              </div>
            </>
          )}

          <div className="flex-column">
            <label>Mobile No:</label>
          </div>
          <div className="inputForm">
            <input
              type="text"
              className="input"
              placeholder="Enter your Mobile No"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-column">
            <label>Password</label>
          </div>
          <div className="inputForm">
            <input
              type="password"
              className="input"
              placeholder="Enter your Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="button-submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p className="p">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="span" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Registration;  