import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SAVE_TOKENS_CONSTANT } from '../../utils/constant.js';
import RNRestart from 'react-native-restart';

// export const baseURL = 'http://10.10.1.227:8001';


export const apiHandle = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor - Add token
apiHandle.interceptors.request.use(async req => {
  const { accessToken } = await getTokens();

  console.log('accessTokenaaaa', accessToken);
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});

// Response interceptor - Handle token refresh
apiHandle.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = await getTokens();
        console.log('refreshToken', refreshToken);
        if (!refreshToken) {
          await clearTokens();
          return Promise.reject(error);
        }

        // Call the refresh token API
        const response = await axios.post(`${baseURL}/auth/refresh-token`, {
          refreshToken: refreshToken,
        });
        console.log('response auth>>>>>>>>>>>>>>>>', response);
        const newAccessToken = response.data.accessToken; // only token returned

        if (!newAccessToken) {
          await clearTokens();
          return Promise.reject(new Error('No access token returned'));
        }

        // Save only access token (no new refresh token provided)
        await saveTokens(newAccessToken, refreshToken);

        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiHandle(originalRequest);
      } catch (refreshError) {
        await clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export const _sessionExpired = async () => {
  try {
    await AsyncStorage.clear();
    RNRestart.restart();
  } catch (error) {
    console.error('Failed to clear data:', error);
  }
};

// Get tokens from storage
export const getTokens = async () => {
  const accessToken = await AsyncStorage.getItem(
    SAVE_TOKENS_CONSTANT.ACCESS_TOKEN,
  );
  const refreshToken = await AsyncStorage.getItem(
    SAVE_TOKENS_CONSTANT.REFRESH_TOKEN,
  );
  return { accessToken, refreshToken };
};

// Save tokens to storage
export const saveTokens = async (accessToken, refreshToken) => {
  await AsyncStorage.multiSet([
    [SAVE_TOKENS_CONSTANT.ACCESS_TOKEN, accessToken],
    [SAVE_TOKENS_CONSTANT.REFRESH_TOKEN, refreshToken],
  ]);
};

// Clear tokens
export const clearTokens = async () => {
  console.log('Clearing tokens');
  await AsyncStorage.multiRemove([
    SAVE_TOKENS_CONSTANT.ACCESS_TOKEN,
    SAVE_TOKENS_CONSTANT.REFRESH_TOKEN,
  ]);
  // RNRestart.restart();
};
