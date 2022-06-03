import express from "express";
import verifyToken from "./middleware/auth.middleware";
import initWebRoutes from "./router/api";
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

initWebRoutes(app);

// database

const posts = [
  {
    userId: 1,
    post: "post duc",
  },
  {
    userId: 2,
    post: "post trung",
  },
  {
    userId: 1,
    post: "post duc 2",
  },
];

// app
app.get("/posts", verifyToken, (req, res) => {
  res.json(posts.filter((post) => post.userId === req.userId));
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
