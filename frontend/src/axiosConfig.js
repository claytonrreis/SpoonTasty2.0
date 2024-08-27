// import axios from "axios";

// // Configure Axios to include credentials with every request
// axios.defaults.withCredentials = true;

// // Set the base URL for your API (adjust as needed)
// axios.defaults.baseURL = "http://localhost:5932";

// const token = localStorage.getItem("token"); // Ensure token is saved in localStorage if needed
// axios
//   .post("http://localhost:5932/api/spooners/register", formData, {
//     headers: {
//       Authorization: `Bearer ${token}`, // If using Bearer tokens
//     },
//   })
//   .then((response) => console.log(response))
//   .catch((error) => console.error(error));

// export default axios;

import axios from "axios";

// Configure Axios to include credentials with every request
axios.defaults.withCredentials = true;

// Set the base URL for your API (adjust as needed)
axios.defaults.baseURL = "http://localhost:5932";

export default axios;
