import { useEffect, useState } from "react"
import { getCurrentPosition } from "geolocation"
import axios from "axios";

export function useGetWeather(){
    const [currentWeather, setCurrentWeather] = useState(null);
    const [error, setError] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    const capitaliseWords = (str) => {
        return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "); 
    }

    useEffect(() => {
        const fetchUserLocation = () => {
            getCurrentPosition((err, position) => {
                if(err){
                    console.log(err);
                    setError(err);
                    return error;
                }
                const {latitude, longitude} = position.coords;
                setUserLocation({latitude, longitude})
            })
        }
        fetchUserLocation();
    }, [])

    useEffect(() => {
        console.log(userLocation)
        const  fetchWeatherData = async () => {
            try{
                const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
                const data = await axios.get(weatherAPI);
                
                let {description, main, icon} = data.data.weather[0];
                let {temp} = data.data.main;
                description = capitaliseWords(description);
                main = capitaliseWords(main);
                icon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
                
                setCurrentWeather({description, main, icon, temp})
            }catch(error){
                console.error(error);
                setError(error);
                return error
            }
        }
        fetchWeatherData();
    }, [userLocation])

    return {currentWeather, error}
}

