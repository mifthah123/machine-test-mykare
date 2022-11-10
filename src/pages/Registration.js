import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../components/Image";
import Input from "../components/Input";
import Title from "../components/Title";
import "../styles/auth.css";

function Registration() {
  const navigate = useNavigate();
  useEffect(() => {
    const isUserAuth = localStorage.getItem("loggedIn_user");
    const isEmpty = localStorage.getItem("users");
    if (isUserAuth) {
      navigate("/dashboard");
    }
    if (!isEmpty) {
      const adminUser = [
        {
          username: "admin",
          password: "admin",
        },
      ];
      localStorage.setItem("users", JSON.stringify(adminUser));
    }
  });

  const [inputData, setInputData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    error: "",
    success: "",
  });
  const { name, username, email, password, error, success } = inputData;

  const handleChange = (inputValue) => (e) => {
    setInputData({
      ...inputData,
      [inputValue]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetching users data from localStorage.
    const getUserData = localStorage.getItem("users");

    if (getUserData) {
      let usersList = JSON.parse(localStorage.getItem("users"));
      let isUserExist = false;
      // Using for loop to check if the user registered.
      for (let i = 0; i < usersList.length; i++) {
        // If the user already registered then send an error message and break the loop.
        if (usersList[i].username === username) {
          setInputData({
            ...inputData,
            error: "User already exists.",
            success: "",
          });
          isUserExist = true;
          break;
        }
      }

      // If the user doesn't exist in the user's data, then create a new user.
      if (!isUserExist) {
        const newUser = {
          name,
          username,
          email,
          password,
        };
        usersList.push(newUser);
        localStorage.setItem("users", JSON.stringify(usersList));
        setInputData({
          ...inputData,
          success: "Your registration completed. Please login to your account.",
          error: "",
        });
      }
    } else {
      // Additional validation
      const user = [
        {
          name,
          username,
          email,
          password,
        },
      ];
      localStorage.setItem("users", JSON.stringify(user));
      setInputData({
        ...inputData,
        success: "Your registration completed. Please login to your account.",
        error: "",
      });
    }
  };
  return (
    <div className="container">
      <div className="wrapper">
        <Image url="https://cdn.pixabay.com/photo/2022/10/07/11/02/autumn-7504819_1280.jpg" />
        <div className="form__container">
          <Title title="Welcome" />
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Name"
              handleChange={handleChange("name")}
              value={name}
            />
            <Input
              type="text"
              placeholder="Username"
              handleChange={handleChange("username")}
              value={username}
            />
            <Input
              type="email"
              placeholder="Email"
              handleChange={handleChange("email")}
              value={email}
            />
            <Input
              type="password"
              placeholder="Password"
              handleChange={handleChange("password")}
              value={password}
            />
            <button style={{ marginTop: "20px" }}>Register</button>
            <p className="success">{success}</p>
            <p className="error">{error}</p>
          </form>
          <div style={{ marginTop: "20px" }}>
            <p style={{ margin: 0 }}>Already have an account?</p>
            <a href="/">Login now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
