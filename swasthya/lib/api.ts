/**
 * Mobile API client for communicating with Swasthya Next.js backend
 * Handles authentication, HTTP requests, and response parsing
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
// TODO: Set this to your local machine's IP for device testing
// For development, use your local IP address instead of localhost
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.1.192.151:3000';
const AUTH_STORAGE_KEY = '@swasthya_auth_token';
const USER_STORAGE_KEY = '@swasthya_user';

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  user?: T;
  token?: string;
  error?: string;
  success?: boolean;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Get authentication token from storage
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
}

/**
 * Store authentication token
 */
export async function setAuthToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, token);
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
}

/**
 * Remove authentication token
 */
export async function removeAuthToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
  }
}

/**
 * Get stored user data
 */
export async function getStoredUser(): Promise<any> {
  try {
    const userStr = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error('Error getting stored user:', error);
    return null;
  }
}

/**
 * Store user data
 */
export async function setStoredUser(user: any): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user:', error);
  }
}

/**
 * Remove stored user data
 */
export async function removeStoredUser(): Promise<void> {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Error removing stored user:', error);
  }
}

/**
 * Clear all auth data
 */
export async function clearAuth(): Promise<void> {
  await removeAuthToken();
  await removeStoredUser();
}

/**
 * Make an API request
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') 
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || 'An error occurred',
        response.status,
        data
      );
    }

    // Return the full response data, not just a nested property
    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      500
    );
  }
}

/**
 * POST request
 */
export async function apiPost<T>(
  endpoint: string,
  body: any
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

/**
 * GET request
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'GET',
  });
}

/**
 * PUT request
 */
export async function apiPut<T>(
  endpoint: string,
  body: any
): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

/**
 * DELETE request
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: 'DELETE',
  });
}

/**
 * POST request with FormData (for file uploads)
 */
export async function apiPostFormData<T>(
  endpoint: string,
  formData: FormData
): Promise<T> {
  const token = await getAuthToken();
  
  const headers: Record<string, string> = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') 
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || 'An error occurred',
        response.status,
        data
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      500
    );
  }
}

/**
 * Login user
 */
export async function login(email: string, password: string) {
  const response = await apiPost<{
    message: string;
    user: any;
    token: string;
  }>('/api/auth/login', { email, password });
  
  // Store token and user
  if (response && typeof response === 'object' && 'token' in response) {
    await setAuthToken(response.token);
    if (response.user) {
      await setStoredUser(response.user);
    }
  }
  
  return response;
}

/**
 * Register user
 */
export async function register(userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
}) {
  const response = await apiPost<{
    message: string;
    user: any;
    token: string;
  }>('/api/auth/register', userData);
  
  if (response && typeof response === 'object' && 'token' in response) {
    await setAuthToken(response.token);
    if (response.user) {
      await setStoredUser(response.user);
    }
  }
  
  return response;
}

/**
 * Logout user
 */
export async function logout() {
  await clearAuth();
  await apiPost('/api/auth/logout', {});
}

/**
 * Get current user info
 */
export async function getCurrentUser() {
  return apiGet('/api/auth/me');
}

export interface DiagnosisResponse {
  success: boolean;
  diagnosis: {
    suggestions: Array<{
      condition: string;
      probability: number;
      description?: string;
      recommendations?: string[];
    }>;
    confidence?: number;
    analysis?: string;
  };
  performedBy?: any;
}

export interface ImageAnalysisResponse {
  success: boolean;
  analysis: {
    diagnosis: string;
    conditions: string[];
    confidence: number;
    findings: string[];
    recommendations?: string[];
  };
}

/**
 * AI Diagnosis
 */
export async function diagnose(symptoms: string[], description?: string): Promise<DiagnosisResponse> {
  return apiPost<DiagnosisResponse>('/api/ai/diagnose', { symptoms, description });
}

export interface SymptomsAnalysisResponse {
  success: boolean;
  analysis: {
    suggestions: Array<{
      condition: string;
      probability: number;
      description?: string;
      recommendations?: string[];
    }>;
    confidence?: number;
    analysis?: string;
  };
  disclaimer?: string;
}

/**
 * Analyze symptoms
 */
export async function analyzeSymptoms(symptoms: string[], description?: string): Promise<SymptomsAnalysisResponse> {
  return apiPost<SymptomsAnalysisResponse>('/api/ai/analyze-symptoms', { symptoms, description });
}

/**
 * Analyze medical image
 */
export async function analyzeImage(imageUri: string, imageType: string = 'image/jpeg'): Promise<ImageAnalysisResponse> {
  // For mobile, convert image URI to blob/form data
  const formData = new FormData();
  
  // In React Native, we need to use the image URI directly
  formData.append('image', {
    uri: imageUri,
    type: imageType,
    name: 'image.jpg',
  } as any);
  
  return apiPostFormData<ImageAnalysisResponse>('/api/ai/analyze-image', formData);
}

/**
 * Upload medical record
 */
export async function uploadMedicalRecord(
  fileUri: string,
  fileName: string,
  fileType: string,
  metadata: any = {},
  patientId?: string
) {
  const formData = new FormData();
  
  formData.append('file', {
    uri: fileUri,
    type: fileType,
    name: fileName,
  } as any);
  
  // Get patientId from metadata if provided, otherwise use user's uid
  const effectivePatientId = patientId || metadata.patientId;
  if (effectivePatientId) {
    formData.append('patientId', effectivePatientId);
  }
  
  formData.append('labels', JSON.stringify(['healthcare']));
  formData.append('tags', JSON.stringify(['medical_record']));
  formData.append('metadata', JSON.stringify(metadata));
  
  return apiPostFormData('/api/blockchain/store', formData);
}

/**
 * Get patient records
 */
export async function getPatientRecords(patientId: string) {
  return apiGet(`/api/blockchain/records?patientId=${patientId}`);
}

/**
 * Verify medical record
 */
export async function verifyMedicalRecord(fileId: string) {
  return apiGet(`/api/blockchain/verify?fileId=${fileId}`);
}

/**
 * Export the API base URL for use in other modules
 */
export { API_BASE_URL };

