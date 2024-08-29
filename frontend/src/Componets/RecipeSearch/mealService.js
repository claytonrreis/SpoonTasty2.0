// import axios from "axios";

// const API_URL = "https://www.themealdb.com/api/json/v1/1/";

// export const searchMeals = async (query) => {
//   try {
//     const response = await axios.get(`${API_URL}search.php`, {
//       params: { s: query },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching meals:", error);
//     throw error;
//   }
// };

//test render
import axios from "axios";

const API_URL = "/api/meals/";

export const searchMeals = async (query) => {
  try {
    const response = await axios.get(`${API_URL}search.php`, {
      params: { s: query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching meals:", error);
    throw error;
  }
};
