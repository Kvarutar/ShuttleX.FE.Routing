import axios, { type AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

import { type AxiosInstanceConfig } from './types';

const createAxiosInstance = ({
  url,
  retryConfig,
  onSignOut,
  refreshTokenUrl,
}: {
  url: string;
} & AxiosInstanceConfig): AxiosInstance => {
  const instance = axios.create({
    baseURL: url,
  });

  if (retryConfig) {
    axiosRetry(instance, retryConfig);
  }

  if (refreshTokenUrl) {
    instance.interceptors.request.use(
      async config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    instance.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refreshToken');
          try {
            const deviceId = 'browser';
            const response = await axios.post(refreshTokenUrl, {
              refreshToken,
              deviceId,
            });
            const { accessToken, refreshToken: newRefreshToken } = response.data;

            //await saveTokens({ accessToken, refreshToken: newRefreshToken });
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', newRefreshToken);

            instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            return instance(originalRequest);
          } catch (refreshError) {
            //TODO: remove before prod
            console.error('Token refresh failed:', refreshError);
            localStorage.setItem('accessToken', '');
            localStorage.setItem('refreshToken', '');

            onSignOut?.(refreshToken);

            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  return instance;
};

export default createAxiosInstance;
