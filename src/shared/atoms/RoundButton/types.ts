import { ReactNode } from 'react';

import { StyleProp } from '../../types';

export enum RoundButtonSizes {
  S = 's',
  M = 'm'
}

export type RoundButtonProps = {
  children: ReactNode;
  style?: StyleProp;
  onClick?: () => void;
  size?: RoundButtonSizes;
};
