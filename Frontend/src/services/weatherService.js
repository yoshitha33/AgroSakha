import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_URL}/current-weather`, {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getWeatherForecast = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_URL}/forecast`, {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getWeatherAlerts = async () => {
  try {
    const response = await axios.get(`${API_URL}/alerts`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
