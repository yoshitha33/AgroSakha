import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getCropRecommendation = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/crop-recommendation`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
