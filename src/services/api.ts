import axios from 'axios';
import { ColorSubmission, ColorSearchResult, ApiResponse, ApiError } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitColor = async (submission: ColorSubmission): Promise<ApiResponse<ColorSearchResult>> => {
  try {
    const response = await api.post<ApiResponse<ColorSearchResult>>('/colors', submission);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || 'Failed to submit color',
        statusCode: error.response?.status || 500,
      } as ApiError;
    }
    throw error;
  }
};

export const searchColors = async (firstName: string): Promise<ApiResponse<ColorSearchResult[]>> => {
  try {
    // Don't make API call if firstName is empty
    if (!firstName || !firstName.trim()) {
      return {
        data: [],
        statusCode: 200
      };
    }
    
    const response = await api.get<ApiResponse<ColorSearchResult[]>>('/colors', {
      params: { firstName },
    });
    
    // Ensure we always return a properly formatted response with data array
    // This fixes the blank page issue when searching for "Ethan"
    return {
      data: Array.isArray(response.data.data) ? response.data.data : [],
      statusCode: response.data.statusCode || 200
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || 'Failed to search colors',
        statusCode: error.response?.status || 500,
      } as ApiError;
    }
    throw error;
  }
}; 