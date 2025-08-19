import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

function DailySales() {
  const [dailySale, setDailySale] = useState([]);

  const fetchDailySales = async () => {
    try {
      const res = await fetch("http://localhost:4000/stockAuth/dailySales", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setDailySale(data);
      console.log({ data });
    } catch (error) {
      console.log("Error fetching daily sales in frontend part", error);
    }
  };
  useEffect(() => {
    fetchDailySales();
  }, []);

  return (
    <div>
      <h1>Daily Sales Data</h1>
      <Navbar />
      <div className="tableData">
        <h3 className="heading">Daily Sales Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product Name</th>
              <th>Product Category</th>
              <th>Total Product</th>
              <th>Total Sales Amount </th>
            </tr>
          </thead>
          <tbody>
            {dailySale &&
              dailySale.map((row, i) => (
                <tr key={i}>
                  <th>
                    {row._id.year}/{row._id.month}/{row._id.day}
                  </th>
                  <td>{row._id.name}</td>
                  <td>{row._id.category}</td>
                  <td>{row.totalItems}</td>
                  <td>Rs {row.totalAmount} /-</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <a href="monthlySales">
        <button>Monthly Sales</button>
      </a>
      <a href="yearlySales">
        <button>Yearly Sales</button>
      </a>
    </div>
  );
}

export default DailySales;
