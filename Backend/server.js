import axios from "axios";
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

const FRONTEND_URL = "https://rohitgpt.onrender.com";

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api",chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  }catch(err){
    console.log("Failed to connect to MongoDB", err);
  }
}
// app.post("/test", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       "HTTP-Referer": "http://localhost:8080",
//       "X-Title": "MyGPT",
//     },
//     body: JSON.stringify({
//       model: "deepseek/deepseek-chat-v3-0324:free",
//       messages: [
//         {
//           role: "user",
//           content: req.body.message,
//         },
//       ],
//     }),
//   };

//   try {
//     const response = await fetch(
//       "https://openrouter.ai/api/v1/chat/completions",
//       options
//     );
//     const data = await response.json();
//     // console.log(data.choices[0].message.content);
//     res.send(data);
//   } catch (err) {
//     console.log(err);
//   }
// });
