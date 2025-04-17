import { ReactNode } from 'react';

import { StyleProp } from '../../types';

export enum ButtonMods {
  Mode1 = 'mode1',
  Mode2 = 'mode2',
  Disabled = 'disabled'
}

export type ButtonProps = {
  mode?: ButtonMods;
  children?: string | ReactNode;
  onClick?: () => void;
  style?: StyleProp
};
