import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth.middleware";

dotenv.config();
const app = express();

app.use(express.json());

// database
let users = [
  {
    id: 1,
    username: "duc",
    refreshToken: null,
  },
  {
    id: 2,
    username: "trung",
    refreshToken: null,
  },
];

// app

const generateTokens = (payload) => {
  const { id, username } = payload;

  // Create JWT
  const accessToken = jwt.sign(
    { id, username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "5m",
    }
  );

  const refreshToken = jwt.sign(
    { id, username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { accessToken, refreshToken };
};

const refreshToken = (username, refreshToken) => {
  users = users.map((user) => {
    if (user.username === username)
      return {
        ...user,
        refreshToken,
      };

    return user;
  });
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = users.find((user) => user.username === username);

  if (!user) return res.sendStatus(401);

  const tokens = generateTokens(user);
  refreshToken(username, tokens.refreshToken);

  console.log(users);

  res.json(tokens);
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(401);
  }

  const user = users.find((user) => user.refreshToken === refreshToken);
  if (!user) return res.sendStatus(403);

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const tokens = generateTokens(user);
    refreshToken(user.username, tokens.refreshToken);

    res.json(tokens);
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
});

app.delete("/logout", verifyToken, (req, res) => {
  const user = users.find((user) => user.id === req.userId);
  refreshToken(user.username, null);

  res.sendStatus(204);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is runing on the PORT ${PORT}`));
