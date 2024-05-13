#include <ESP8266WiFi.h>
#include <DHT.h>
#include <ESP8266HTTPClient.h>

#define DHTPIN D2     // DHT22 data pin connected to GPIO 2 (D2)
#define DHTTYPE DHT22 // DHT22 sensor type

const char* ssid = "UiTiOt-E3.1";
const char* password = "UiTiOtAP";

const char* serverAddress = "http://172.31.11.109";
const int serverPort = 3001;
const String apiEndpoint = "/api/devices/6641cbbf249acef0fca56452/sensor-data"; // Update with your API endpoint

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  delay(1000);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");

  dht.begin();
}

void loop() {
  delay(10000); // Wait a few seconds between measurements
  
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Create JSON payload
  String data = "{\"sensors\":{\"temperature\":" + String(temperature) + ",\"humidity\":" + String(humidity) + "}}";

  // Send data to server
  sendDataToServer(data);
}

void sendDataToServer(String data) {
  WiFiClient client;
  HTTPClient http;

  Serial.print("Connecting to server: ");
  Serial.println(serverAddress);

  // Send HTTP POST request
  // http.begin(client, serverAddress + apiEndpoint);
  http.begin(client, "http://172.31.11.109:3001/api/devices/6641cf257765919ac6728a91/sensor-data"); // Specify the endpoint
  http.addHeader("Content-Type", "application/json");
  int httpCode = http.POST(data);

  if (httpCode > 0) {
    Serial.printf("HTTP response code: %d\n", httpCode);
    String payload = http.getString();
    Serial.println("Response: " + payload);
  } else {
    Serial.printf("HTTP request failed: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}
