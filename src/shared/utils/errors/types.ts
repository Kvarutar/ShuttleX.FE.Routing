export enum NetworkErrorsStatuses {
  NoExistings = 'no_existing',
  TokenExpired = 'token_expired',
  IncorrectFields = 'incorrect_fields',
  ServerError = 'server_error',
  Locked = 'locked',
  TooManyRequests = 'too_many_requests',
  PaymentRequired = 'payment_required',
}

export type IncorrectFieldsErrorBody = {
  field: string | null;
  message: string;
};

export type IncorrectFieldsErrorBodyArray = {
  field: string;
  message: string;
}[];

export type LockedErrorBody = {
  lockOutEndTime: string;
  lockOutReason: string;
};

export type NetworkErrorsBodies = string | IncorrectFieldsErrorBody | IncorrectFieldsErrorBodyArray | LockedErrorBody;

export type NetworkErrorDetails = {
  status: NetworkErrorsStatuses;
  code: number;
};

export type NetworkErrorDetailsWithBody<T> = Omit<NetworkErrorDetails, 'status'> & {
  status: string | NetworkErrorsStatuses;
  body: T;
};
