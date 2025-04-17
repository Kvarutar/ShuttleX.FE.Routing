import CloseIcon from '../../../assets/icons/x.svg';
import classes from '../../utils/classes';
import RoundButton from '../RoundButton';
import styles from './Popup.module.scss';
import { PopupProps } from './types';

const Popup = ({ children, wrapperStyles, contentStyles, closePopup }: PopupProps) => (
  <div className={styles.background}>
    <div className={classes([styles.wrapper, wrapperStyles])}>
      {closePopup && (
        <RoundButton style={styles.close} onClick={closePopup}>
          <img src={CloseIcon} alt="close" />
        </RoundButton>
      )}
      <div className={classes([styles.content, contentStyles])}>{children}</div>
    </div>
  </div>
);

export default Popup;
