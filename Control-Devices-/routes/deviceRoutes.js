const express = require("express");
const router = express.Router();
const deviceController = require("../controllers/deviceController");

router.post("/addDevice", deviceController.addDevice);
router.get("/get", deviceController.getDevices);
router.get("/get/:id", deviceController.getDeviceById);
router.put("/update/:id", deviceController.updateDevice); 
router.delete("/delete/:id", deviceController.deleteDevice);

module.exports = router;