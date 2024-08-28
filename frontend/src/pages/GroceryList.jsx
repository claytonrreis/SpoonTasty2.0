import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateGroceryList from "./UpdateGroceryList";
import "../Styles/grocery-list.css";

const GroceryList = () => {
  const [groceryLists, setGroceryLists] = useState([]);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchGroceryLists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5932/api/spooners/grocery-lists",
          { withCredentials: true }
        );
        setGroceryLists(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchGroceryLists();
  }, []);

  const handleUpdateClick = (list) => {
    setSelectedList(list);
    setShowUpdateForm(true);
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
    setSelectedList(null);
  };

  const handleDeleteList = async (listId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this list?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `http://localhost:5932/api/spooners/grocery-lists/${listId}`,
          { withCredentials: true }
        );
        setGroceryLists(groceryLists.filter((list) => list._id !== listId));
        setSelectedList(null);
        setShowUpdateForm(false);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    }
  };

  return (
    <div className="GroceryList-container">
      <h1>My Grocery Lists</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {groceryLists.length > 0 ? (
          groceryLists.map((list) => (
            <div key={list._id} style={{ marginBottom: "20px" }}>
              <h2>{list.listName}</h2>
              <ul>
                {list.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} {item.unit}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleUpdateClick(list)}>Update</button>
              <button
                onClick={() => handleDeleteList(list._id)}
                style={{ marginLeft: "10px", color: "red" }}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No grocery lists found.</p>
        )}
      </ul>

      {showUpdateForm && selectedList && (
        <UpdateGroceryList
          list={selectedList}
          onClose={handleCloseForm}
          onUpdate={() =>
            setGroceryLists((prevLists) =>
              prevLists.map((l) =>
                l._id === selectedList._id ? selectedList : l
              )
            )
          }
        />
      )}
    </div>
  );
};

export default GroceryList;
