// import React, { useState } from "react";
// import axios from "axios";

// const UpdateGroceryList = ({ list, onClose, onUpdate }) => {
//   const [listName, setListName] = useState(list.listName);
//   const [items, setItems] = useState(list.items);
//   const [error, setError] = useState(null);

//   const handleItemChange = (index, e) => {
//     const { name, value } = e.target;
//     const newItems = [...items];
//     newItems[index] = { ...newItems[index], [name]: value };
//     setItems(newItems);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { name: "", quantity: 0, unit: "" }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `https://spoontasty2-0.onrender.com/api/spooners/grocery-lists/${list._id}`,
//         { listName, items },
//         { withCredentials: true }
//       );
//       onUpdate(); // Update parent component
//       onClose(); // Close the update form
//     } catch (error) {
//       setError(error.response ? error.response.data.message : error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Update Grocery List</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={listName}
//           onChange={(e) => setListName(e.target.value)}
//           placeholder="List Name"
//           required
//         />
//         {items.map((item, index) => (
//           <div key={index}>
//             <input
//               type="text"
//               name="name"
//               value={item.name}
//               onChange={(e) => handleItemChange(index, e)}
//               placeholder="Item Name"
//               required
//             />
//             <input
//               type="number"
//               name="quantity"
//               value={item.quantity}
//               onChange={(e) => handleItemChange(index, e)}
//               placeholder="Quantity"
//               required
//             />
//             <input
//               type="text"
//               name="unit"
//               value={item.unit}
//               onChange={(e) => handleItemChange(index, e)}
//               placeholder="Unit"
//             />
//           </div>
//         ))}
//         <button type="button" onClick={handleAddItem}>
//           Add Item
//         </button>
//         <button type="submit">Update List</button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </form>
//       <button onClick={onClose}>Close</button>
//     </div>
//   );
// };

// export default UpdateGroceryList;

import React, { useState } from "react";
import axios from "axios";

const UpdateGroceryList = ({ list, onClose, onUpdate }) => {
  const [listName, setListName] = useState(list.listName);
  const [items, setItems] = useState(list.items);
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

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://spoontasty2-0.onrender.com/api/spooners/grocery-lists/${list._id}`,
        { listName, items },
        { withCredentials: true }
      );
      onUpdate(); // Update parent component
      onClose(); // Close the update form
      window.location.reload();
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div>
      <h2>Update Grocery List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="List Name"
          required
        />
        {items.map((item, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
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
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="submit">Update List</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UpdateGroceryList;
