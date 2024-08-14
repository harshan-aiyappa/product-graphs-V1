// src/apiService.js
import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'http://192.168.29.50:8081',
  timeout: 10000,
});

// Function to fetch the most popular language data
export const fetchPopularLanguageData = async () => {
  try {
    const response = await apiClient.get('http://192.168.29.50:8081/api/getgraph_popularlanguageamongusers?', {
      params: {
        p_srclang: 'en-GB', // Source language
        p_tgtlang: 'es-ES', // Target language
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular language data:', error);
    throw error;
  }
};
