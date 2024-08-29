const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const spoonerRoutes = require("./routes/spoonerRoutes");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();

// cors({
//   origin: "http://localhost:5173",
//   credentials: true,
// })

// app.use(cors());

// cors({
//   origin: "https://spoontasty2-0-1.onrender.com",
//   credentials: true,
// });

// cors({
//   credentials: true,
// });

// app.use(
//   cors({
//     origin: "https://spoontasty2-0-1.onrender.com",

//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "https://spoontasty2-0-1.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

//test for render
// Proxy middleware to forward API requests that were blocked by cors

app.use("/api/spooners", spoonerRoutes);
app.get("/api/meals/*", async (req, res) => {
  try {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1${req.originalUrl.replace(
      "/api/meals",
      ""
    )}`;
    const response = await axios.get(apiUrl, { params: req.query });
    res.json(response.data);
  } catch (error) {
    console.error("Error proxying request:", error);
    res.status(500).json({ error: "Proxy error" });
  }
});

mongoose
  .connect(
    process.env.MONGO_URI
    //   {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
