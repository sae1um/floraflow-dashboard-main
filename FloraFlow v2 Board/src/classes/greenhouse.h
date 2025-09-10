#ifndef GREENHOUSE_H
#define GREENHOUSE_H

#include <DHT.h>
#define DHT_PIN D5 // DHT11 Temp & Humidity
#define LDR_PIN D5 // LDR
#define WATER_PIN A0 // Water Level
extern DHT dht;


class Greenhouse {
public:
    Greenhouse(String mac);
    String greenhouseId;
    float temperature;
    float humidity;
    int lightLevel;
    int waterLevel;

    String setGreenhouseId(String mac);
    Greenhouse& readDHTSensor();
    Greenhouse& readLDR();
    Greenhouse& readWaterLevel();
    Greenhouse& readAllSensors();
};
#endif