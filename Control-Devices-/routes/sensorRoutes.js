const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensorController");

router.post(
  "/devices/:device_id/sensor-data",
  sensorController.postSensorData
);

router.get("/get", sensorController.getAllSensorData);
router.get(
  "/sensor-data/:device_id",
  sensorController.getSensorDataByDeviceId
);


module.exports = router;
