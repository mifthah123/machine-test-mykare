import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../components/Image";
import Input from "../components/Input";
import Title from "../components/Title";
import "../styles/auth.css";

function Login() {
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
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    error: "",
  });

  const { username, password, error } = loginData;

  const handleChange = (inputValue) => (e) => {
    setLoginData({
      ...loginData,
      [inputValue]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getUserData = localStorage.getItem("users");

    if (getUserData) {
      let usersList = JSON.parse(localStorage.getItem("users"));
      let isUserExist = false;
      let fUsername = null;
      let fPassword = null;
      for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].username === username) {
          isUserExist = true;
          fUsername = usersList[i].username;
          fPassword = usersList[i].password;
          break;
        }
      }
      if (!isUserExist) {
        setLoginData({
          ...loginData,
          error: "User doesn't exist.",
        });
      }

      if (isUserExist) {
        if (fPassword === password) {
          localStorage.setItem("loggedIn_user", JSON.stringify(fUsername));
          navigate("/dashboard");
        } else {
          setLoginData({
            ...loginData,
            error: "Password is incorrect.",
          });
        }
      }
    }
  };
  return (
    <div className="container">
      <div className="wrapper">
        <Image url="https://cdn.pixabay.com/photo/2016/11/09/15/27/dna-1811955_1280.jpg" />
        <div className="form__container">
          <Title title="Login" />
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username"
              handleChange={handleChange("username")}
              value={username}
            />
            <Input
              type="password"
              placeholder="Password"
              handleChange={handleChange("password")}
              value={password}
            />
            <button style={{ marginTop: "20px" }}>Login</button>
            <p className="error">{error}</p>
          </form>
          <div style={{ marginTop: "20px" }}>
            <p style={{ margin: 0 }}>Don't have an account?</p>
            <a href="/register">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
