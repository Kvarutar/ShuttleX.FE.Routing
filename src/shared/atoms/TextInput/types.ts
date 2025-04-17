import { HTMLAttributes } from 'react';

import { StyleProp } from '../../types';

export type TextInputProps = {
  value?: string;
  maxLength?: number;
  minLength?: number;
  name?: string;
  placeholder?: string;
  required?: boolean;
  id?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text';
  isCompleted?: boolean;
  style?: StyleProp;
};
