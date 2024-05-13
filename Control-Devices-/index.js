const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const deviceRoutes = require("./routes/deviceRoutes");
const sensorRoutes = require("./routes/sensorRoutes");

// const DeviceModel = require("./models/DeviceModel"); // Assuming your DeviceModel is defined in a separate file

app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for all routes
app.use('/api', deviceRoutes);
app.use('/api', sensorRoutes);

// [POST] create data
// app.post("/api/addDevice", async (req, res) => {
//   try {
//     const { device_name, sensor_type, isActive } = req.body;

//     const newDevice = new DeviceModel({
//       device_name,
//       sensor_type,
//       isActive,
//     });

//     const savedDevice = await newDevice.save();

//     res.status(201).json(savedDevice);
//   } catch (error) {
//     console.error("Error creating device:", error);
//     res.status(500).json({ error: "Could not create device" });
//   }
// });

// // [GET] get all devices
// app.get("/api/devices", async (req, res) => {
//   try {
//     const devices = await DeviceModel.find({});
//     res.status(200).json(devices);
//   } catch (error) {
//     console.error("Error fetching devices:", error);
//     res.status(500).json({ error: "Could not fetch devices" });
//   }
// });

mongoose
  .connect(
    "mongodb+srv://tanhero2002:23032002@iot.uhvnzrb.mongodb.net/?retryWrites=true&w=majority&appName=IOT",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.error("Could not connect to MongoDB:", err);
  });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
