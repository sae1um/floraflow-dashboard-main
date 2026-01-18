#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <WiFiUdp.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>
#include <ArduinoJson.h>

#include "classes/Greenhouse.h"
// Function Prototypes 
String getMacAddress(String mac);
void initHTTP();
void lcdMessage();
void initGreenhouse();

#define GROWLIGHT_PIN D4 // Growlight
#define SERVO_PIN D6 // Servo Motor

Greenhouse gh(getMacAddress(WiFi.macAddress()));
LiquidCrystal_I2C lcd(0x3F, 16, 2); // Sets the LCD I2C address
Servo VentServo;

String serverName = "http://192.168.0.192:3002/api/"; //TODO REMOVE LOCALHOST LATER, MIGHT BE IP
// String serverName = "https://floraflow-backend.onrender.com/api";
// - Wifi Credentials
const char *ssid = "";
const char *password = "";

void setup(){
  Serial.begin(115200);
  
  initHTTP();

  // lcd.init();
  // lcd.backlight();
  // lcdMessage();
  
  // pinMode(LDR_PIN, INPUT);
  // pinMode(GROWLIGHT_PIN, OUTPUT);
  
  // VentServo.attach(SERVO_PIN, 500, 2400);
  // VentServo.write(90);
  initGreenhouse();
  // boolean initialised = initGreenhouse();
  // if(!initialised){
  //   Serial.println("Error during intialisation");
  // }
}

void loop(){
  // gh.readAllSensors();
}

String getMacAddress(String mac){
  // Returns the MAC address without colons
  String result;
  char macChars[18];
  mac.toCharArray(macChars, 18);
  for(int i = 0; i < 18; i++){
    if(macChars[i] == ':'){
      continue;
    }
    else{
      result += macChars[i];
    }
  }
  result.toUpperCase(); //just in case
  return result;
}

void initGreenhouse(){
  if(WiFi.status() == WL_CONNECTED){
    JsonDocument doc;
    WiFiClient client;
    HTTPClient http;

    String requestData;
    String serverPath = serverName + "greenhouses/initialise";
    Serial.println(serverPath);
    
    http.begin(client, serverPath);
    http.addHeader("Content-Type", "application/json");
    
    doc["greenhouseId"] = gh.greenhouseId;
    serializeJson(doc, requestData);
    int responseCode = http.POST(requestData);
    Serial.print("Response Code: ");
    Serial.println(responseCode);

    http.end();
  }else{
    Serial.println("Wifi Disconnected");
  }
}

void initHTTP(){
  WiFi.begin(ssid, password);
    Serial.println("Connecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    
    Serial.println("Connected to Wifi network with IP: ");
    Serial.println(WiFi.localIP());
}

void updateScreen(Greenhouse gh)
{
    // Water Level
    lcd.setCursor(0, 0);
    lcd.print("H20 Level: ");
    lcd.print(gh.waterLevel);
    lcd.setCursor(0, 1);
    lcd.print("Temp: ");
    lcd.print(gh.temperature);
    lcd.print("");
}
