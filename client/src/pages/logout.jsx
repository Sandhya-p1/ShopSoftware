import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault;
    try {
      await fetch("http://localhost:4000/routeAuth/logout", {
        method: "POST",
        credentials: "include",
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      console.log("Error In LogOut");
    }
  };
  return (
    <div>
      <button className="logoutBtn" onClick={handleLogout}>
        LogOut
      </button>
    </div>
  );
}

export default Logout;
