import { ReactNode } from 'react';

import { StyleProp } from '../../types';

export enum BarModes {
  Active = 'active',
  Disabled = 'disabled',
}

export type BarProps = {
  children: ReactNode;
  mode?: BarModes;
  style?: StyleProp
  onClick?: () => void; 
};
