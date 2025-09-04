#ifndef GREENHOUSE_H
#define GREENHOUSE_H

#include <DHT.h>
#define DHT_PIN D5 // DHT11 Temp & Humidity
#define LDR_PIN D5 // LDR
#define WATER_PIN A0 // Water Level

DHT dht(DHT_PIN, DHT11);

class Greenhouse{
    private:
        String gardenid;
    public:
        Greenhouse(String mac);
        float temperature;
        float humidity;
        int lightLevel;
        int waterLevel;
        
        String setGardenId(String mac);

        Greenhouse readDHTSensor();
        Greenhouse readLDR();
        Greenhouse readWaterLevel();
        Greenhouse readAllSensors();
};

#endif