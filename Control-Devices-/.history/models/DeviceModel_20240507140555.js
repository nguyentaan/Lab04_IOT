const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DeviceSchema = new Schema(
  {
    sensor_name: String,
    sensor_location: String,
  },
  {
    timestamps: true,
  }
);

const DeviceModel = model("Sensor", DeviceSchema);

module.exports = SensorsModel;
