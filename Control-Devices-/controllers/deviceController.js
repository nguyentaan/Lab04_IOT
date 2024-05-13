const DeviceModel = require("../models/DeviceModel");

exports.addDevice = async (req, res) => {
  try {
    const { device_name, sensor_type, isActive } = req.body;

    const newDevice = new DeviceModel({
      device_name,
      sensor_type,
      isActive,
    });

    const savedDevice = await newDevice.save();

    res.status(201).json(savedDevice);
  } catch (error) {
    console.error("Error creating device:", error);
    res.status(500).json({ error: "Could not create device" });
  }
};

exports.getDevices = async (req, res) => {
  try {
    const devices = await DeviceModel.find({});
    res.status(200).json(devices);
  } catch (error) {
    console.error("Error fetching devices:", error);
    res.status(500).json({ error: "Could not fetch devices" });
  }
};

exports.getDeviceById = async (req, res) => {
  try {
    const { id } = req.params;

    const device = await DeviceModel.findById(id);

    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.status(200).json(device);
  } catch (error) {
    console.error("Error fetching device:", error);
    res.status(500).json({ error: "Could not fetch device" });
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const { device_name, sensor_type, isActive } = req.body;
    const { id } = req.params;

    const updatedDevice = await DeviceModel.findByIdAndUpdate(
      id,
      {
        device_name,
        sensor_type,
        isActive,
      },
      { new: true }
    ); // { new: true } ensures the function returns the updated document

    if (!updatedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.status(200).json(updatedDevice);
  } catch (error) {
    console.error("Error updating device:", error);
    res.status(500).json({ error: "Could not update device" });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDevice = await DeviceModel.findByIdAndDelete(id);

    if (!deletedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }

    res.status(200).json({ message: "Device deleted successfully" });
  } catch (error) {
    console.error("Error deleting device:", error);
    res.status(500).json({ error: "Could not delete device" });
  }
};
