import axios from 'axios';
import { ColorSubmission, ColorRecordResponse, ErrorResponse } from '@generated/client';
import DEBUG from '../utils/debug';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitColor = async (submission: ColorSubmission): Promise<ColorRecordResponse> => {
  try {
    const response = await api.post<ColorRecordResponse>('/colors', submission);
    DEBUG('Color submission response: %O', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || 'Failed to submit color',
        statusCode: error.response?.status || 500,
      } as ErrorResponse;
    }
    throw error;
  }
};

export const searchColors = async (firstName: string): Promise<ColorRecordResponse> => {
  try {
    // Don't make API call if firstName is empty
    if (!firstName || !firstName.trim()) {
      DEBUG('Empty firstName provided, returning empty results');
      return {
        data: undefined,
        statusCode: 200
      };
    }
    
    DEBUG('Searching colors for firstName: %s', firstName);
    const response = await api.get<ColorRecordResponse>('/colors', {
      params: { firstName },
    });

    DEBUG('Search response: %O', response.data);
    
    // Ensure we always return a properly formatted response with data array
    return {
      data: response.data.data,
      statusCode: response.data.statusCode || 200
    };
  } catch (error) {
    DEBUG('Error searching colors: %O', error);
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || 'Failed to search colors',
        statusCode: error.response?.status || 500,
      } as ErrorResponse;
    }
    throw error;
  }
}; 