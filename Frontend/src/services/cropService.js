import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const getCropRecommendation = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/crop-recommendation`, data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message || 'Failed to get crop recommendation';
    throw errorMessage;
  }
};
