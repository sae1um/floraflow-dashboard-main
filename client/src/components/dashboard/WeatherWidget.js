import Box from '@mui/material/Box';
import { useGetWeather } from '../../hooks/useGetWeather';
import { MdLocationOff } from "react-icons/md";

export default function WeatherWidget() {
    const {currentWeather, error} = useGetWeather();    

    return (
        <Box className="bg-card-image rounded-md w-auto h-auto bg-cover text-white p-4 font-bold m-2 ">
            <p className='drop-shadow-2xl'>Welcome to the FloraFlow Dashboard</p>
            {currentWeather &&
                <div className='flex flex-row justify-between items-center bg-black-20'>
                    <div>
                        <p className='text-xl drop-shadow-2xl'>{currentWeather.description}</p>
                        <p className='text-2xl drop-shadow-2xl'>{currentWeather.temp} &deg;C</p>
                    </div>
                    <img src={currentWeather.icon} className='w-auto h-auto object-contain self-start drop-shadow-lg' alt='weather icon'/>
                </div>
            } 
            {
                !currentWeather ? <p className='text-md italic font-normal flex flex-row items-center gap-4' >Cannot get location <MdLocationOff className='text-xl text-red-500'/></p>
                :
                ""
            }
        </Box>
    )
}
