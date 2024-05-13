const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const DeviceSchema = new Schema(
  {
        name: String,
        use
        isActive: Boolean,
        message: String,
  },
  {
    timestamps: true,
  }
);

const DeviceModel = model("Device", DeviceSchema);

module.exports = DeviceModel;
