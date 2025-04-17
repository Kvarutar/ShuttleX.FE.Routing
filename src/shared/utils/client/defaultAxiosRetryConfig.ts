import { type AxiosError } from 'axios';
import axiosRetry from 'axios-retry';

const defaultAxiosRetryConfig = {
  retries: 3,
  retryCondition(error: AxiosError) {
    switch (error.status) {
      case 500:
        return true; // Retry
      default:
        return false; // Do not retry
    }
  },
  retryDelay: axiosRetry.exponentialDelay,
};

export default defaultAxiosRetryConfig;
