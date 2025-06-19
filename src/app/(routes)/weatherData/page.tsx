'use client';

import Customerheader from '@/lib/components/layout/header/Customerheader';
import React, { useState, useEffect } from 'react';

interface WeatherData {
    name: string;
    sys: {
        country: string;
    };
    main: {
        temp: number;
        humidity: number;
    };
    wind: {
        speed: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    cod: number;
    message?: string;
}

const WeatherPage = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [city, setCity] = useState('Ho Chi Minh,VN'); // Default city set to Ho Chi Minh City

    // Using your provided OpenWeatherMap API key
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Replace with environment variable in production

    const fetchWeather = async (cityInput: string) => {
        try {
            setLoading(true);
            console.log('Fetching weather with API key:', apiKey); // Debug API key
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityInput)}&appid=${apiKey}&units=metric`;
            console.log('Fetching weather with URL:', url); // Debug URL
            const response = await fetch(url);
            console.log('Response status:', response.status); // Debug status
            console.log('Response ok:', response.ok); // Debug ok
            if (!response.ok) {
                const errorData = await response.json();
                console.log('Error response:', errorData); // Debug error details
                if (response.status === 401) {
                    throw new Error(
                        'Unauthorized: Please verify your API key or check your email for confirmation.',
                    );
                } else if (response.status === 404) {
                    throw new Error(
                        `City not found: "${cityInput}" is invalid. Try "Ho Chi Minh,VN" or "Saigon,VN".`,
                    );
                } else {
                    throw new Error(
                        `HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown'}`,
                    );
                }
            }
            const data = await response.json();
            console.log('Raw API response:', data); // Debug raw response
            if (data.cod === 200) {
                setWeather(data);
            } else {
                throw new Error('City not found or API error: ' + data.message);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching weather:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather(city); // Fetch weather for default city on mount
    }, [apiKey]); // Only re-fetch if apiKey changes

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handleSearch = () => {
        if (city.trim()) {
            fetchWeather(city); // Gọi API khi nhấn Search
        } else {
            setError('Please enter a city name.');
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <Customerheader />
            <h1 className="text-3xl font-bold mt-20 mb-6 text-gray-800">Weather Information</h1>
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="Enter city (e.g., Ho Chi Minh City,VN)"
                    className="p-2 border border-gray-300 rounded-lg w-full md:w-1/2"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    Search
                </button>
            </div>
            {weather && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        {weather.name}, {weather.sys.country}
                    </h2>
                    <p className="text-lg mt-2">Temperature: {weather.main.temp}°C</p>
                    <p className="text-lg mt-1">Humidity: {weather.main.humidity}%</p>
                    <p className="text-lg mt-1">Wind Speed: {weather.wind.speed} m/s</p>
                    <p className="text-lg mt-1">Weather: {weather.weather[0].description}</p>
                    {weather.weather[0].icon && (
                        <img
                            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="Weather icon"
                            className="mt-2 w-16 h-16"
                        />
                    )}
                </div>
            )}
            {!weather && !loading && !error && (
                <p className="text-center py-10">Enter a city to see the weather.</p>
            )}
        </div>
    );
};

export default WeatherPage;
