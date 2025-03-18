export interface ColorSubmission {
  firstName: string;
  favoriteColor: string;
}

export interface ColorSearchResult {
  firstName: string;
  favoriteColor: string;
  timestamp: string;
}

export interface ApiResponse<T> {
  data: T;
  statusCode: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
} 