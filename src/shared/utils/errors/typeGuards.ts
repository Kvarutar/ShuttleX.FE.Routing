import {
  type IncorrectFieldsErrorBody,
  type IncorrectFieldsErrorBodyArray,
  type LockedErrorBody,
  type NetworkErrorDetails,
  type NetworkErrorDetailsWithBody,
  type NetworkErrorsBodies,
  NetworkErrorsStatuses,
} from './types';

type NetworkError = NetworkErrorDetailsWithBody<NetworkErrorsBodies>;

export const isTokenExpiredError = (
  errorResponse: NetworkError,
): errorResponse is NetworkErrorDetails & { body: string } => {
  return errorResponse.status === NetworkErrorsStatuses.TokenExpired;
};

export const isNoExistingsError = (
  errorResponse: NetworkError,
): errorResponse is NetworkErrorDetails & { body: string } => {
  return errorResponse.status === NetworkErrorsStatuses.NoExistings;
};

export const isIncorrectFieldsError = (
  errorResponse: NetworkError,
): errorResponse is NetworkErrorDetails & { body: IncorrectFieldsErrorBody | IncorrectFieldsErrorBodyArray } => {
  return errorResponse.status === NetworkErrorsStatuses.IncorrectFields;
};

export const isLockedError = (
  errorResponse: NetworkError,
): errorResponse is NetworkErrorDetails & { body: LockedErrorBody } => {
  return errorResponse.status === NetworkErrorsStatuses.Locked;
};

export const isTooManyRequestsError = (
  errorResponse: NetworkError,
): errorResponse is NetworkErrorDetails & { body: string } => {
  return errorResponse.status === NetworkErrorsStatuses.TooManyRequests;
};

export const isServerError = (errorResponse: NetworkError): errorResponse is NetworkErrorDetails & { body: string } => {
  return errorResponse.status === NetworkErrorsStatuses.ServerError;
};
