require("dotenv").config();

const express=require("express");
const cors = require("cors");
const roomRoutes = require("./routes/roomRoutes");
const connectDB = require("./config/db");
const hotelRoutes = require("./routes/hotelRoutes");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app=express();
app.use(cors());
app.use(express.json());
app.use("/hotels", hotelRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/",(req,res)=>{
  res.send("server is running......")
})

app.use("/auth", authRoutes);


app.use("/rooms", roomRoutes);

app.use("/bookings", bookingRoutes);
app.use("/reviews", reviewRoutes);
app.put("/test", (req, res) => {
    res.json({ message: "PUT Working" });
});
app.get("/rooms", (req, res) => {
    res.json({
      
      message:"all rooms"
    });
});

connectDB();

app.listen(8000,()=>{
  console.log("server started on port 8000")
});




