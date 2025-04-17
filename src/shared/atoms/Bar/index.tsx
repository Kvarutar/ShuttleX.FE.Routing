import classes from '../../utils/classes';
import styles from './bar.module.scss';
import { BarModes, BarProps } from './props';

const Bar = ({ children, mode = BarModes.Active, style, onClick }: BarProps) => {
  return <div onClick={onClick} className={classes([styles.bar, styles['bar_' + mode], style])}>{children}</div>;
};

export default Bar;
