import express from 'express';
import {
  getCurrentWeather,
  getWeatherForecast,
  getWeatherAlerts,
} from '../controllers/weatherController.js';

const router = express.Router();

router.get('/current-weather', getCurrentWeather);
router.get('/forecast', getWeatherForecast);
router.get('/alerts', getWeatherAlerts);

export default router;
