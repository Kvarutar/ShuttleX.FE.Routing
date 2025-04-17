import { type IAxiosRetryConfig } from 'axios-retry';

export type AxiosInstanceConfig = {
  retryConfig?: IAxiosRetryConfig;
  onSignOut?: (refreshToken: string | null) => void;
  refreshTokenUrl?: string;
};
