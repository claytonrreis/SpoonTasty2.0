import React, { useState } from "react";
import axios from "axios";
import "../Styles/grocery-form.css";

const GroceryForm = () => {
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 0, unit: "" }]);
  const [error, setError] = useState(null);

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [name]: value };
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 0, unit: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5932/api/spooners/grocery-lists/create",
        { listName, items },
        { withCredentials: true }
      );
      alert("Grocery list created successfully!");
      setListName("");
      setItems([{ name: "", quantity: 0, unit: "" }]); // Reset form
      window.location.reload();
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <form className="GroceryForm-container" onSubmit={handleSubmit}>
      <h2>Create New Grocery List</h2>
      <input
        type="text"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        placeholder="List Name"
        required
      />
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={(e) => handleItemChange(index, e)}
            placeholder="Item Name"
            required
          />
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(index, e)}
            placeholder="Quantity"
            required
          />
          <input
            type="text"
            name="unit"
            value={item.unit}
            onChange={(e) => handleItemChange(index, e)}
            placeholder="Unit"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddItem}>
        Add Item
      </button>
      <button type="submit">Create List</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default GroceryForm;
