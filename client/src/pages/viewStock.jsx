import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import { useState } from "react";

function ViewStock() {
  const [stockList, setStockList] = useState([]);
  const fetchedData = async () => {
    try {
      const res = await fetch("http://localhost:4000/stockAuth/viewStock", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setStockList(data);
      console.log({ data });
    } catch (error) {
      console.log("Error fetching stocks", error);
      alert("Error fetching stocks");
    }
  };
  useEffect(() => {
    fetchedData();
  }, []);

  return (
    <div>
      <h1>ViewStock</h1>
      <Navbar />
      <div className="tableData">
        <table>
          <thead>
            <tr>
              {/* <th>Id</th> */}
              <th>Name</th>
              <th>Category</th>
              <th>Price(per piece)</th>
              <th>Total Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {stockList &&
              stockList.map((stock) => (
                <tr key={stock._id}>
                  <td>{stock.name}</td>
                  <td>{stock.category}</td>
                  <td>{stock.pricePerPiece}</td>
                  <td>{stock.totalItems}</td>
                  <td>{stock.totalPrice}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewStock;
