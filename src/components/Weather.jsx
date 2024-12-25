
import React, { useEffect, useState } from "react";



 function Weather() {
    const [city, setCity] = useState("Delhi");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

const currentDate = new Date();
   const months = [
    'January', 
    'February',
     'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December',
];
const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY ="b773efc3df3508cdc573a4107ee31a5a";

  const fetchWeatherData = async () => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        console.log(data)
        setWeatherData(data);
    }catch(error){
        console.log(error)
    }
  }

  useEffect(()=>{
    fetchWeatherData ()

  },[])


  const handleInputChange = (event) => {
   
    setCity(event.target.value);
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };


  const getWheatherIconUrl = (main) =>{
    switch (main){
        case "Clear":
        return "/suns.png";
        case"Rain":
        return "/thunder.png";
        case "Snow":
            return "/snows.jpg"; // Path to your snowy weather icon
          case "Haze":
            return "/sunnycludy.png"; // Path to your haze weather icon
          // Add more cases for other weather conditions as needed
           case "Smoke":
            return "/transparent.png";
            case "Clouds":
            return "/rainfall.png";
          default:
            return null;
        }

    };
  
 
  return (

    
    <div className='App'>
        <div className='container'>
           { weatherData &&(
            <>
                <h1 className='container_date'>{formattedDate}</h1>
                    <div className='weather_data'>
                        <h2 className='container_city'>{weatherData.name}</h2>
                        {/* <img className='container_img' src='/thunder.png' width='100px' alt='thander'/> */}
                        <img className="container_img" src={getWheatherIconUrl(weatherData.weather[0].main)} width="150px" alt="Weather Icon" />
                        <h2 className='container_degree'>{weatherData.main.temp}</h2>
                        <h2 className='country_per'>{weatherData.weather[0].main}</h2>
                    <form className='form' onSubmit={handleSubmit}>
                        <input type='text' className='input' placeholder='Enter city name' onChange={handleInputChange} required/>
                        <button type='submit'>Get</button>

                    </form>
                </div>
            </>
           )}
        </div>  
    </div>
    
  )
  };


export default Weather;