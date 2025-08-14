import React from "react";
import Logout from "../pages/logout";

function Navbar() {
  return (
    <div>
      {" "}
      <div className="dashboardNav">
        <a href="/dashboard">
          {" "}
          <h3>Dashboard</h3>
        </a>
        <nav>
          <a href="/newstock">
            <h3>Add New Stock</h3>
          </a>{" "}
          <a href="/viewStock">
            <h3>View Stock</h3>
          </a>
          <a href="/reducestock">
            {" "}
            <h3>Reduce Stock</h3>
          </a>
          <Logout />
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
