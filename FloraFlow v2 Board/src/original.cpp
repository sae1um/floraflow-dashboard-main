// Libraries
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

#include <DHT.h>
#include <LiquidCrystal_I2C.h>
#include <Servo.h>

// Function Declarations


// ===== Time Code ======
const long utcOffsetInSeconds = 3600;
char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

// Define NTP Client to get time
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

#define DHT_PIN D5 // DHT11 Temp & Humidity
DHT dht(DHT_PIN, DHT11);
#define LDR_PIN D5 // LDR
#define GROWLIGHT_PIN D4 // Growlight
#define WATER_SIGNAL_PIN A0 // Water Level
#define SERVO_PIN D6 // Servo Motor
Servo VentServo;

class DHTClassR
{
public:
    float temp;
    float humid;
    int lightLevel;
    int waterLevel;
    int gardenid = 1;
};
void initHTTP();
void sendDataToServer(DHTClassR dhtI1R);
void updateScreen(DHTClassR dht1);
void openVent();
void getTime();
// ===== CLASS METHODS ======
DHTClassR readDHTSensor(DHTClassR dhtIR)
{
    // dhtIR = dht Instance Readings
    dhtIR.temp = dht.readTemperature();
    dhtIR.humid = dht.readHumidity();

    if (isnan(dhtIR.temp) || isnan(dhtIR.humid))
    {
        Serial.println("Failed to read sensor");
        return dhtIR;
    }
    return dhtIR;
}

DHTClassR readLDR(DHTClassR dhtIR)
{
    // 2 = light, 1 = no light, 3 = no reading
    dhtIR.lightLevel = digitalRead(LDR_PIN);

    // HIGH = DARK, LOW = LIGHT
    if (dhtIR.lightLevel == HIGH)
    {
        Serial.println("LOW LIGHT LEVEL");
        dhtIR.lightLevel = 1;
        return dhtIR;
    }
    else if (dhtIR.lightLevel == LOW)
    {
        Serial.println("THERE IS LIGHT");
        dhtIR.lightLevel = 2;
        return dhtIR;
    }
    else
    {
        Serial.println("NO READING...");
        dhtIR.lightLevel = 3;
        return dhtIR;
    }
}

DHTClassR getWaterLevel(DHTClassR dhtIR)
{
    dhtIR.waterLevel = analogRead(WATER_SIGNAL_PIN);
    Serial.print("Sensor Value: ");
    Serial.println(dhtIR.waterLevel);
    return dhtIR;
}

// Screen init
LiquidCrystal_I2C lcd(0x3F, 16, 2);

// WIFI INFO
const char *ssid = "Saelum_";
const char *password = "Password123";

String serverName = "https://floraflow-backend.onrender.com/api/updateSensor";

void setup()
{
    Serial.begin(115200);
    Serial.println("Smart Garden");

    initHTTP();

    dht.begin();
    lcd.init();
    lcd.backlight();
    timeClient.begin();
    pinMode(GROWLIGHT_PIN, OUTPUT); // Growlight
    pinMode(LDR_PIN, INPUT);        // LDR

    VentServo.attach(SERVO_PIN, 500, 2400);
    VentServo.write(90);
}

void loop()
{
    // dht instance 1 reading
    DHTClassR dhtI1R;

    // Read Sensors
    dhtI1R = readDHTSensor(dhtI1R);
    dhtI1R = readLDR(dhtI1R);
    dhtI1R = getWaterLevel(dhtI1R);

    Serial.println("Temperature: ");
    Serial.print(dhtI1R.temp);
    Serial.println("°C");

    updateScreen(dhtI1R);
    getTime();

    if (dhtI1R.temp > 22 || dhtI1R.humid > 10)
    {
        openVent();
    }

    digitalWrite(GROWLIGHT_PIN, HIGH);
    Serial.println("-------------");
    delay(3000);
    sendDataToServer(dhtI1R);
    digitalWrite(GROWLIGHT_PIN, LOW);
}

void initHTTP()
{
    WiFi.begin(ssid, password);
    Serial.println("Connecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.print("Connected to Wifi network with IP");
    Serial.print(WiFi.localIP());
}

void sendDataToServer(DHTClassR dhtI1R)
{
    if (WiFi.status() == WL_CONNECTED)
    {
        WiFiClient client;
        HTTPClient http;

        String gardenData = "?gardenid=" + String((int)dhtI1R.gardenid) + "&temperature=" + String((int)dhtI1R.temp) + "&humidity=" + String((int)dhtI1R.humid) + "&light=" + String((int)dhtI1R.lightLevel);
        String serverPath = serverName + gardenData;
        Serial.println(serverPath);

        http.begin(client, serverPath.c_str());

        int httpResponseCode = http.GET();

        if (httpResponseCode > 0)
        {
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
            String payload = http.getString();
            Serial.println(payload);
        }
        else
        {
            Serial.print("Error Code: ");
            Serial.println(httpResponseCode);
        }

        http.end();
    }
    else
    {
        Serial.println("Wifi disconnected");
    }
}

void updateScreen(DHTClassR dht1)
{
    // Water Level
    lcd.setCursor(0, 0);
    lcd.print("H20 Level: ");
    lcd.print(dht1.waterLevel);
    lcd.setCursor(0, 1);
    lcd.print("Temp: ");
    lcd.print(dht1.temp);
    lcd.print("");
}

void openVent()
{
    VentServo.write(90);
    delay(2000);
}

void getTime()
{
    timeClient.update();

    Serial.print(daysOfTheWeek[timeClient.getDay()]);
    Serial.print(", ");
    Serial.print(timeClient.getHours());
    Serial.print(":");
    Serial.print(timeClient.getMinutes());
    Serial.print(":");
    Serial.println(timeClient.getSeconds());
    // Serial.println(timeClient.getFormattedTime());

    time_t epochTime = timeClient.getEpochTime();
    Serial.print("Epoch Time: ");
    Serial.println(epochTime);

    // Get a time structure
    struct tm *ptm = gmtime((time_t *)&epochTime);

    int date_day = ptm->tm_mday;
    int date_month = ptm->tm_mon + 1;
    int currentYear = ptm->tm_year + 1900;

    String date_date = String(currentYear) + ":" + String(date_month) + ":" + String(date_day);
    Serial.println(date_date);
}