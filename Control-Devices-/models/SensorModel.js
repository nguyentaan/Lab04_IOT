const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SensorSchema = new Schema(
  {
    device: {type: Schema.Types.ObjectId, ref: "Device"},
    humidity: Number,
    temperature: Number,
    light: Number,
    // led_status:Boolean,
  },
  {
    timestamps: true,
  }
);

const SensorModel = model("Sensor", SensorSchema);

module.exports = SensorModel;
