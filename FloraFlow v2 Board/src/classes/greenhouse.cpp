#include "Greenhouse.h"
DHT dht(DHT_PIN, DHT11);
Greenhouse::Greenhouse(String mac) {
    String id = setGreenhouseId(mac);
    id.trim();
    this->greenhouseId = id;
    dht.begin();
}

String Greenhouse::setGreenhouseId(String mac) {
    return "GH-" + mac;
}

Greenhouse& Greenhouse::readDHTSensor() {
    this->temperature = dht.readTemperature();
    this->humidity = dht.readHumidity();

    if (isnan(this->temperature) || isnan(this->humidity)) {
        Serial.println("Failed to read sensor");
    }
    return *this;
}

Greenhouse& Greenhouse::readLDR() {
    int reading = digitalRead(LDR_PIN);

    switch (reading) {
        case HIGH:
            lightLevel = 0;
            break;
        case LOW:
            lightLevel = 1;
            break;
        default:
            lightLevel = 2;
            break;
    }
    return *this;
}

Greenhouse& Greenhouse::readWaterLevel() {
    this->waterLevel = analogRead(WATER_PIN);
    return *this;
}

Greenhouse& Greenhouse::readAllSensors() {
    readDHTSensor();
    readLDR();
    readWaterLevel();
    return *this;
}