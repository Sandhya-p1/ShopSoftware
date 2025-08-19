import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
const MonthlySales = () => {
  const [monthlySale, setmonthlySale] = useState([]);

  const fetchmonthlySales = async () => {
    try {
      const res = await fetch("http://localhost:4000/stockAuth/monthlySales", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setmonthlySale(data);
      console.log({ data });
    } catch (error) {
      console.log("Error fetching monthly sales in frontend part", error);
    }
  };
  useEffect(() => {
    fetchmonthlySales();
  }, []);

  return (
    <div>
      <h1>Monthly Sales Data</h1>
      <Navbar />
      <div className="tableData">
        <h3 className="heading">Monthly Sales Summary</h3>
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
            {monthlySale &&
              monthlySale.map((row, i) => (
                <tr key={i}>
                  <th>
                    {row._id.year} / {row._id.month}
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
    </div>
  );
};

export default MonthlySales;
