const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const deviceRoutes = require("./routes/deviceRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const authRoutes = require("./routes/authRoutes");

// const DeviceModel = require("./models/DeviceModel"); // Assuming your DeviceModel is defined in a separate file

app.use(bodyParser.json()); // Use bodyParser middleware to parse JSON request bodies
app.use(cors()); // Enable CORS for all routes
app.use('/api', deviceRoutes);
app.use('/api', sensorRoutes);
app.use('/api', authRoutes);

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
