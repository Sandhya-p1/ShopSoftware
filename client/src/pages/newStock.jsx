import React, { useState } from "react";
import Navbar from "../components/navbar";

export default function NewStock() {
  //   const [stockList, setStockList] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemPrice, setItemPrice] = useState(null);
  const [totalItems, setTotalItems] = useState(null);
  const [message, setMessage] = useState("");

  const handleAddingStock = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/stockAuth/addStock", {
        method: "POST",
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
      //   setStockList((prev) => [...prev, data.data]);
      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setItemName("");
      setItemCategory("");
      setItemPrice(null);
      setTotalItems(null);
    } catch (error) {
      console.log("Error adding stocks:", error);
    }
  };

  return (
    <div>
      <h1>New Stock </h1>
      <Navbar />
      <form className="addingStockForm" onSubmit={handleAddingStock}>
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
          type="text"
          value={itemPrice || ""}
          onChange={(e) => setItemPrice(e.target.value)}
          placeholder="Price Per Piece"
        />
        <input
          type="text"
          value={totalItems || ""}
          onChange={(e) => setTotalItems(e.target.value)}
          placeholder="Total Items"
        />
        <button>Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
