#include "Greenhouse.h"

class Greenhouse{
    private:
        String gardenid;
    
    public:
        Greenhouse(String mac){
            String id = setGardenId(mac);
            id.trim();
            this->gardenid = id;
            dht.begin();
        }
        float temperature;
        float humidity;
        int lightLevel;
        int waterLevel;
        
        //METHODS
        String setGardenId(String mac){
            return "GH-" + mac; // TEMPORARY
        }

        Greenhouse readDHTSensor(){
            this->temperature = dht.readTemperature();
            this->humidity = dht.readHumidity();
            
            if(isnan(this->temperature)|| isnan(this->humidity)){
                Serial.println("Failed to read sensor");
                return *this;
            }
            return *this;
        }

        Greenhouse readLDR(){
            int reading = digitalRead(LDR_PIN);
            
            // 0 = no light, 1 = light, 2 = no reading
            switch (reading){
                case HIGH:
                    lightLevel = 0;
                    return *this;
                    break;
                case LOW:
                    lightLevel = 1;
                    return *this;
                    break;
                default:
                    lightLevel = 2;
                    return *this;
                    break;
            }
        }

        Greenhouse readWaterLevel(){
            this->waterLevel = analogRead(WATER_PIN);
            return *this;
        }

        Greenhouse readAllSensors(){
            readDHTSensor();
            readLDR();
            readWaterLevel();
            return *this;
        }
};