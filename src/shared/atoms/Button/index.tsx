import classes from '../../utils/classes';
import styles from './button.module.scss';
import { ButtonMods, ButtonProps } from './props';

const Button = ({ mode = ButtonMods.Mode1, children, onClick, style }: ButtonProps) => (
  <button className={classes([styles.btn, styles['btn_' + mode], style])} onClick={onClick}>
    {children}
  </button>
);

export default Button;
