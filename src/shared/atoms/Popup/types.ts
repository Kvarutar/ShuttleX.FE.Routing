import { ReactNode } from 'react';

import { StyleProp } from '../../types';

export type PopupProps = {
  children: ReactNode;
  wrapperStyles?: StyleProp;
  contentStyles?: StyleProp;
  closePopup?: () => void;
};
