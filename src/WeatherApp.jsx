import hotBg from './assets/Summer.jpg'
import coldBg from './assets/Winter.jpg'
import { Button, } from '@mui/material'
import { Descriptions } from './components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';

export const WeatherApp = () => {

    const [city, setCity] = useState('Buenos Aires')
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState("metric");
    const [bg, setBg] = useState(hotBg)

    useEffect(() => {

        const fetchWeatherData = async ( ) => {
            const data = await getFormattedWeatherData(city, units)
            setWeather(data);

            const thershold = units === 'metric' ? 20: 60;
            if (data.temp <= thershold) setBg (coldBg)
            else setBg(hotBg)
        }

        fetchWeatherData();
        
    }, [units, city, bg])

    const handleunitsClick = (e) => {
        const button = e.currentTarget;
        const currentUnit = button.innerText.slice(1);

        const isCelsius = currentUnit === 'C';
        button.innerText = isCelsius ? ' °F' : ' °C'
        setUnits(isCelsius ? 'metric' : 'imperial')
    }

    const handleInput = (e) => {

        if (e.keyCode === 13) {
            setCity(e.currentTarget.value);
            e.currentTarget.blur();
        }
    }


  return (
    <div 
        className='animate__animated animate__fadeIn weatherApp' 
        style={{backgroundImage: `url(${bg})`}}
    >
        <div className="overlay">
            {
                weather && (
                    <div className="container">

                    <div className="section sectionInputs">
        
                        <form className='input'>
                            <input onKeyDown={handleInput} type='text' name='city' placeholder='Enter city...' />
                        </form>

                        <Button
                            className='inputBtn'
                            onClick={handleunitsClick}
                        >
                            °F
                        </Button>
                        
                    </div>

                    <div className="section sectionTemperature">

                        <div className="icon">
                            <h3>{`${weather.name}, ${weather.country}`}</h3>
                            <img src={weather.iconURL} alt='weatherIcon' />
                            <h3> {`${weather.description}`} </h3>
                        </div>

                        <div className="temperature">
                            <h1>{`${weather.temp.toFixed()} °${
                                units === "metric" ? "C" : "F"
                            }`}</h1>
                        </div>

                    </div>
                    
                    <Descriptions weather={weather} units={units} />
                </div>
                )
            }
            
        </div>
    </div>
  )
}
