import { useState } from "react";
import Navbar from "../components/navbar";

function ReduceStock() {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [message, setMessage] = useState("");

  const handleReducingStock = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/stockAuth/reduceStock", {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: itemName,
          category: itemCategory,
          pricePerPiece: Number(itemPrice),
          totalItems: Number(totalItems),
        }),
      });
      const data = await res.json();
      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setItemName("");
      setItemCategory("");
      setItemPrice("");
      setTotalItems("");
      console.log({ data });
    } catch (error) {
      console.log("error reducing stock ", error);
    }
  };

  return (
    <div>
      <h1>Reduce Stock</h1>
      <Navbar />
      <form
        className="addingStockForm"
        id="removingStockForm"
        onSubmit={handleReducingStock}
      >
        <input
          type="text"
          value={itemName || ""}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Name of the item"
        />
        <input
          type="text"
          value={itemCategory || ""}
          onChange={(e) => setItemCategory(e.target.value)}
          placeholder="Category of the item"
        />
        <input
          type="number"
          value={itemPrice || ""}
          onChange={(e) => setItemPrice(e.target.value)}
          placeholder="Price Per Piece"
        />
        <input
          type="number"
          value={totalItems || ""}
          onChange={(e) => setTotalItems(e.target.value)}
          placeholder="Total Items"
        />
        <button>Reduce Stock</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReduceStock;
