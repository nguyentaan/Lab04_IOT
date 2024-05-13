const SensorModel = require("../models/SensorModel");
const DeviceModel = require("../models/DeviceModel");

module.exports = {
  postSensorData: async (req, res) => {
    try {
      const device_id = req.params.device_id; // Extract device ID from URL parameters
      const { sensors } = req.body;

      // Fetch the device from the database
      const deviceData = await DeviceModel.findById(device_id);

      if (!deviceData) {
        return res.status(404).json({
          success: false,
          message: "Device not found",
        });
      }

      let sensorData;

      // Check the sensor type of the device
      switch (deviceData.sensor_type) {
        case "BH1750":
          // If the device sensor type is "BH1750", send light data
          if (sensors.light === undefined) {
            return res.status(400).json({
              success: false,
              message: "Light data not provided",
            });
          }
          sensorData = new SensorModel({
            device: device_id,
            light: sensors.light,
          });
          break;
        case "DHT22":
          // If the device sensor type is "DHT22", send temperature and humidity data
          if (
            sensors.temperature === undefined ||
            sensors.humidity === undefined
          ) {
            return res.status(400).json({
              success: false,
              message: "Temperature or humidity data not provided",
            });
          }
          sensorData = new SensorModel({
            device: device_id,
            temperature: sensors.temperature,
            humidity: sensors.humidity,
          });
          break;
        default:
          return res.status(400).json({
            success: false,
            message: "Invalid sensor type",
          });
      }

      // Update isActive to true
      deviceData.isActive = true;

      // Update lastActive time of the device
      deviceData.lastActive = new Date();
      await deviceData.save();

      // Save the device with isActive updated
      await deviceData.save();

      // Save the sensor data to the database
      await sensorData.save();

      res.status(201).json({
        success: true,
        message: "Successfully saved sensor data",
        data: sensorData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to save sensor data",
        error: error.message,
      });
    }
  },

  getAllSensorData: async (req, res) => {
    try {
      const sensorData = await SensorModel.find();

      res.status(200).json({
        success: true,
        message: "Successfully get all sensor data",
        data: sensorData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to get all sensor data",
        error: error.message,
      });
    }
  },
  getSensorDataByDeviceId: async (req, res) => {
    try {
      const device_id = req.params.device_id; // Extract device ID from URL parameters

      // Fetch sensor data for the specified device ID
      const sensorData = await SensorModel.find({ device: device_id });

      if (!sensorData || sensorData.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Sensor data not found for the specified device ID",
        });
      }

      res.status(200).json({
        success: true,
        message: "Sensor data retrieved successfully",
        data: sensorData,
      });
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch sensor data",
        error: error.message,
      });
    }
  },
};
