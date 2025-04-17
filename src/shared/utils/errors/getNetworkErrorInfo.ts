import { isAxiosError } from 'axios';

import {
  type IncorrectFieldsErrorBody,
  type IncorrectFieldsErrorBodyArray,
  type LockedErrorBody,
  type NetworkErrorDetails,
  type NetworkErrorsBodies,
  NetworkErrorsStatuses,
} from './types';

const getNetworkErrorInfo = (error: any): NetworkErrorDetails & { body: NetworkErrorsBodies } => {
  if (isAxiosError(error) && error.response) {
    const code = error.response.status;
    switch (code) {
      case 400:
        if (Array.isArray(error.response.data)) {
          return {
            status: NetworkErrorsStatuses.IncorrectFields,
            code,
            body: error.response?.data.map((item: { Field: string; Message: string }) => ({
              field: item.Field.toLowerCase(),
              message: item.Message,
            })) as IncorrectFieldsErrorBodyArray,
          };
        }
        return {
          status: NetworkErrorsStatuses.IncorrectFields,
          code,
          body: {
            field: null,
            message: error.response?.data.Message as string,
          } as IncorrectFieldsErrorBody,
        };
      case 401:
        return {
          status: NetworkErrorsStatuses.TokenExpired,
          code,
          body: '',
        };
      case 402:
        return {
          status: NetworkErrorsStatuses.PaymentRequired,
          code,
          body: error.response?.data.Message as string,
        };
      case 423:
        return {
          status: NetworkErrorsStatuses.Locked,
          code,
          body: {
            lockOutEndTime: error.response?.data.LockoutEndDate,
            lockOutReason: error.response?.data.LockOutReason,
          } as LockedErrorBody,
        };
      case 429:
        return {
          status: NetworkErrorsStatuses.TooManyRequests,
          code,
          body: '',
        };
      case 500:
        return {
          status: NetworkErrorsStatuses.ServerError,
          code,
          body: error.response?.data.Message,
        };
      default:
        return {
          status: NetworkErrorsStatuses.NoExistings,
          code,
          body: error.response?.data.Message,
        };
    }
  }

  return {
    status: NetworkErrorsStatuses.NoExistings,
    code: 404,
    body: 'Something went wrong. Try again later',
  };
};

export default getNetworkErrorInfo;
