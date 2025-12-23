import axios from 'axios';
import config from '../config/index.js';

const OPENWEATHER_API_KEY = config.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(req, res) {
  try {
    if (!OPENWEATHER_API_KEY) {
      console.warn('[Weather] OPENWEATHER_API_KEY missing; returning mock data');
      return res.json({
        temperature: 24,
        feelsLike: 24,
        humidity: 65,
        pressure: 1012,
        windSpeed: 12,
        windDirection: 'N',
        description: 'Sunny',
        icon: '01d',
        cloudiness: 0,
        rainfall: 0,
        visibility: 10,
        city: 'Mock City',
        country: 'IN',
        timestamp: Math.floor(Date.now() / 1000),
        ok: false,
        message: 'Missing OPENWEATHER_API_KEY; using mock data',
      });
    }
    const { lat, lon, city } = req.query;

    if (!lat || !lon) {
      // Default coordinates (Bhimavaram, India - agricultural region)
      const defaultLat = 16.5497;
      const defaultLon = 81.8764;
      
      const response = await axios.get(
        `${OPENWEATHER_BASE_URL}/weather?lat=${defaultLat}&lon=${defaultLon}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      return res.json({
        temperature: response.data.main.temp,
        feelsLike: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        pressure: response.data.main.pressure,
        windSpeed: response.data.wind.speed,
        windDirection: response.data.wind.deg || 'N',
        description: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        cloudiness: response.data.clouds.all,
        rainfall: response.data.rain ? response.data.rain['1h'] || 0 : 0,
        visibility: response.data.visibility / 1000, // Convert to km
        city: response.data.name,
        country: response.data.sys.country,
        timestamp: response.data.dt,
        ok: true,
      });
    }

    const response = await axios.get(
      `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    return res.json({
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind.speed,
      windDirection: response.data.wind.deg || 'N',
      description: response.data.weather[0].main,
      icon: response.data.weather[0].icon,
      cloudiness: response.data.clouds.all,
      rainfall: response.data.rain ? response.data.rain['1h'] || 0 : 0,
      visibility: response.data.visibility / 1000,
      city: response.data.name,
      country: response.data.sys.country,
      timestamp: response.data.dt,
      ok: true,
    });
  } catch (err) {
    console.error('getCurrentWeather error:', err.message);
    // Return mock data on API failure
    return res.json({
      temperature: 24,
      humidity: 65,
      windSpeed: 12,
      description: 'Sunny',
      city: 'New Delhi',
      country: 'IN',
      ok: false,
      message: 'Using mock data - API unavailable',
    });
  }
}

export async function getWeatherForecast(req, res) {
  try {
    if (!OPENWEATHER_API_KEY) {
      console.warn('[Weather] OPENWEATHER_API_KEY missing; returning mock forecast');
      return res.json({
        forecast: [
          { day: 'Mon', temp: 24, description: 'Sunny', humidity: 65, windSpeed: 12 },
          { day: 'Tue', temp: 22, description: 'Sunny', humidity: 60, windSpeed: 10 },
          { day: 'Wed', temp: 18, description: 'Cloudy', humidity: 70, windSpeed: 15 },
          { day: 'Thu', temp: 16, description: 'Rainy', humidity: 85, windSpeed: 20 },
          { day: 'Fri', temp: 12, description: 'Rainy', humidity: 80, windSpeed: 18 },
        ],
        city: 'Mock City',
        country: 'IN',
        ok: false,
        message: 'Missing OPENWEATHER_API_KEY; using mock data',
      });
    }
    const { lat, lon } = req.query;

    // Default coordinates (Bhimavaram, India - agricultural region)
    const defaultLat = 16.5497;
    const defaultLon = 81.8764;

    const response = await axios.get(
      `${OPENWEATHER_BASE_URL}/forecast?lat=${lat || defaultLat}&lon=${lon || defaultLon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    // Process forecast data - group by day
    const forecastByDay = {};
    response.data.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (!forecastByDay[day]) {
        forecastByDay[day] = {
          day,
          temp: Math.round(item.main.temp),
          description: item.weather[0].main,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
        };
      }
    });

    const forecast = Object.values(forecastByDay).slice(0, 5);

    return res.json({
      forecast,
      city: response.data.city.name,
      country: response.data.city.country,
      ok: true,
    });
  } catch (err) {
    console.error('getWeatherForecast error:', err.message);
    // Return mock forecast
    return res.json({
      forecast: [
        { day: 'Mon', temp: 24, description: 'Sunny', humidity: 65, windSpeed: 12 },
        { day: 'Tue', temp: 22, description: 'Sunny', humidity: 60, windSpeed: 10 },
        { day: 'Wed', temp: 18, description: 'Cloudy', humidity: 70, windSpeed: 15 },
        { day: 'Thu', temp: 16, description: 'Rainy', humidity: 85, windSpeed: 20 },
        { day: 'Fri', temp: 12, description: 'Rainy', humidity: 80, windSpeed: 18 },
      ],
      city: 'New Delhi',
      country: 'IN',
      ok: false,
      message: 'Using mock data - API unavailable',
    });
  }
}

export async function getWeatherAlerts(req, res) {
  try {
    if (!OPENWEATHER_API_KEY) {
      console.warn('[Weather] OPENWEATHER_API_KEY missing; returning mock alerts');
      return res.json({
        alerts: [
          {
            type: 'normal',
            severity: 'success',
            title: 'Good Weather Conditions',
            description: 'Current weather is suitable for most farming activities.',
          },
        ],
        ok: false,
        message: 'Missing OPENWEATHER_API_KEY; using mock data',
      });
    }
    // Weather alerts based on current conditions - Bhimavaram
    const currentWeatherResponse = await axios.get(
      `${OPENWEATHER_BASE_URL}/weather?lat=16.5497&lon=81.8764&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    const data = currentWeatherResponse.data;
    const alerts = [];

    // Generate alerts based on weather conditions
    if (data.main.temp > 35) {
      alerts.push({
        type: 'high-temp',
        severity: 'warning',
        title: 'High Temperature Alert',
        description: `Temperature is ${data.main.temp}°C. Ensure adequate irrigation for crops.`,
      });
    }

    if (data.main.humidity > 80) {
      alerts.push({
        type: 'high-humidity',
        severity: 'warning',
        title: 'High Humidity Alert',
        description: `Humidity is ${data.main.humidity}%. Watch for fungal diseases.`,
      });
    }

    if (data.wind.speed > 25) {
      alerts.push({
        type: 'high-wind',
        severity: 'danger',
        title: 'Strong Wind Alert',
        description: `Wind speed is ${data.wind.speed} km/h. Protect delicate plants.`,
      });
    }

    if (data.rain && data.rain['1h'] > 10) {
      alerts.push({
        type: 'heavy-rain',
        severity: 'info',
        title: 'Heavy Rainfall',
        description: `${data.rain['1h']}mm rain detected. Good for irrigation needs.`,
      });
    }

    if (alerts.length === 0) {
      alerts.push({
        type: 'normal',
        severity: 'success',
        title: 'Good Weather Conditions',
        description: 'Current weather is suitable for most farming activities.',
      });
    }

    return res.json({
      alerts,
      ok: true,
    });
  } catch (err) {
    console.error('getWeatherAlerts error:', err.message);
    return res.json({
      alerts: [
        {
          type: 'normal',
          severity: 'success',
          title: 'Good Weather Conditions',
          description: 'Current weather is suitable for most farming activities.',
        },
      ],
      ok: false,
      message: 'Using mock data - API unavailable',
    });
  }
}
