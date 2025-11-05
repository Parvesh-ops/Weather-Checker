import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
    const [Weather, setWeather] = useState(null)
    const [City, setCity] = useState('')
    const [Error, setError] = useState(false)
    const [Loading, setLoading] = useState(false)

    const getWeather = async () => {
        if (!City) return;

        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}&units=metric`;

        try {
            setLoading(true)
            setError(false)

            const response = await axios.get(URL)
            console.log(response.data); // This is an object
            setWeather(response.data)
        } catch (error) {
            setError(true)
            setWeather(null)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-300 via-blue-400 to-blue-600 flex flex-col items-center justify-center p-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 mb-8 drop-shadow-xl animate-bounce">
                Weather App
            </h1>
            <p className="text-white text-lg md:text-xl mb-6 text-center drop-shadow-md">
                Get real-time weather updates for any city in the world 🌤️
            </p>

            <div className="flex space-x-2 mb-6">
                <input
                    type="text"
                    placeholder="Enter city"
                    value={City}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-64 px-4 py-2 rounded-xl border-2 border-blue-500 bg-white text-black placeholder-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
                />

                <button
                    onClick={getWeather}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Get Weather
                </button>
            </div>

            {Loading && <p className="text-white font-semibold animate-pulse">Loading...</p>}
            {Error && <p className="text-red-600 font-semibold">Error: Failed to fetch data</p>}

            {Weather && (
                <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg p-6 w-80 text-center">
                    <h2 className="text-2xl font-bold mb-2">{Weather.name}</h2>
                    <p className="text-lg">Temperature: <span className="font-semibold">{Weather.main.temp}°C</span></p>
                    <p className="text-lg capitalize">Weather: <span className="font-semibold">{Weather.weather[0].description}</span></p>
                    <p className="text-lg">Humidity: <span className="font-semibold">{Weather.main.humidity}%</span></p>
                </div>
            )}
        </div>
    )
}

export default App
