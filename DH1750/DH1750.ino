#include <ESP8266WiFi.h>
#include <Wire.h>
#include <BH1750.h>
#include <ESP8266HTTPClient.h>

// WiFi credentials
const char* ssid = "UiTiOt-E3.1";
const char* password = "UiTiOtAP";

// Server details
const char* serverAddress = "http://172.31.11.109";
const int serverPort = 3001;
const String apiEndpoint = "/api/devices/6641cbbf249acef0fca56452/sensor-data"; // Replace device_id with the actual device ID

// BH1750 sensor
BH1750 lightSensor;

// Function to connect to WiFi
void connectToWiFi() {
  Serial.println("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }
  Serial.println("Connected to WiFi");
}

// Function to send sensor data to server
void sendDataToServer(float lightValue) {
  WiFiClient client;

  HTTPClient http;
  // http.begin(client, serverAddress, serverPort, apiEndpoint);
  http.begin(client, "http://172.31.11.109:3001/api/devices/6641cbbf249acef0fca56452/sensor-data"); // Specify the endpoint
  http.addHeader("Content-Type", "application/json");

  String data = "{\"sensors\":{\"light\":" + String(lightValue) + "}}";
  int httpCode = http.POST(data);

  Serial.print("HTTP Code: ");
  Serial.println(httpCode);

  String payload = http.getString();
  Serial.println("Response: " + payload);

  http.end();
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  lightSensor.begin();
  
  connectToWiFi();
}

void loop() {
  delay(10000);
  float lightValue = lightSensor.readLightLevel();

  Serial.print("Light Level: ");
  Serial.println(lightValue);

  sendDataToServer(lightValue);

}
