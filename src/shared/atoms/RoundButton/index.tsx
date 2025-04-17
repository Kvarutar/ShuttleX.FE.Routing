import classes from '../../utils/classes';
import styles from './RoundButton.module.scss';
import { RoundButtonProps, RoundButtonSizes } from './types';



const RoundButton = ({ children, style, onClick, size=RoundButtonSizes.M }: RoundButtonProps) => {
  const wrapperSizeClass = `wrapper_size_${size}`;

  return (
    <div className={classes([styles.wrapper, styles[wrapperSizeClass], style])} onClick={onClick}>
      <div className={styles.inside}>{children}</div>
    </div>
  )
}

export default RoundButton;
