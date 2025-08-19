import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
const YearlySales = () => {
  const [yearlySale, setyearlySale] = useState([]);

  const fetchyearlySales = async () => {
    try {
      const res = await fetch("http://localhost:4000/stockAuth/yearlySales", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setyearlySale(data);
      console.log({ data });
    } catch (error) {
      console.log("Error fetching yearly sales in frontend part", error);
    }
  };
  useEffect(() => {
    fetchyearlySales();
  }, []);

  return (
    <div>
      <h1>Yearly Sales Data</h1>
      <Navbar />
      <div className="tableData">
        <h3 className="heading">Yearly Sales Summary</h3>
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
            {yearlySale &&
              yearlySale.map((row, i) => (
                <tr key={i}>
                  <th>{row._id.year}</th>
                  <td>{row._id.name}</td>
                  <td>{row._id.category}</td>
                  <td>{row.totalItems}</td>
                  <td>Rs {row.totalAmount} /-</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YearlySales;
