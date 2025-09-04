#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <WiFiUdp.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

#include "classes/greenhouse.h"

#define GROWLIGHT_PIN D4 // Growlight
#define SERVO_PIN D6 // Servo Motor

Greenhouse gh(getMacAddress(WiFi.macAddress()));
LiquidCrystal_I2C lcd(0x3F, 16, 2); // Set the LCD I2C address
Servo VentServo;

String serverName = "https://localhost:3002/api"; //REMOVE LOCALHOST LATER, MIGHT BE IP
// String serverName = "https://floraflow-backend.onrender.com/api";
const char *ssid = "Saelum_";
const char *password = "Password123";

// Function Prototypes 
void getMacAddress();
void initHTTP();

void setup(){
  Serial.begin(115200);
  
  initHTTP();

  lcd.init();
  lcd.backlight();

  pinMode(LDR_PIN, INPUT);
  pinMode(GROWLIGHT_PIN, OUTPUT);

  VentServo.attach(SERVO_PIN, 500, 2400);
  VentServo.write(90);
}

void loop(){
  gh.readAllSensors();
}

String getMacAddress(String mac){
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
  return result;
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
    Serial.print(WiFi.localIP());
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