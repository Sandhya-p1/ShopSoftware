import Navbar from "../components/navbar";

function ViewSales() {
  return (
    <div>
      <h1>View Sales Data</h1>
      <Navbar />
      <div className="viewSales">
        <a href="/dailySales">
          <button>Daily Sales</button>
        </a>
        <a href="monthlySales">
          <button>Monthly Sales</button>
        </a>
        <a href="yearlySales">
          <button>Yearly Sales</button>
        </a>
      </div>
      <h3>
        Click the buttons to see the daily, monthly and yearly sales record.
      </h3>
    </div>
  );
}

export default ViewSales;
