import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const isUserAuth = JSON.parse(localStorage.getItem("loggedIn_user"));
    if (!isUserAuth) {
      navigate("/");
    } else {
      setUser(isUserAuth);
      if (isUserAuth === "admin") {
        setUsersData(JSON.parse(localStorage.getItem("users")));
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn_user");
    const isUserAuth = localStorage.getItem("loggedIn_user");
    if (!isUserAuth) {
      navigate("/");
    }
  };
  return (
    <div className="d__container">
      <p className="d__head">Welcome {user}</p>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
      <div className="d__wrapper">
        {usersData.map(({ username, name, email }, index) => (
          <div key={index} className="user__details">
            <p>Username: {username}</p>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
