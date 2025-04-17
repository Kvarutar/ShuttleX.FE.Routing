import { useState } from 'react';

import classes from '../../utils/classes';
import styles from './Checkbox.module.scss';
import { CheckboxProps } from './props';

const Checkbox = ({ children, style }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkboxStyle = isChecked
    ? `${styles.checkbox__checkmark} ${styles.checkbox__checkmark_checked}`
    : `${styles.checkbox__checkmark}`;

  return (
    <div onClick={() => setIsChecked(prev => !prev)} className={classes([styles.checkbox, style])}>
      <label className={styles.checkbox__element} onClick={() => console.log('clicked')}>
        <input type="checkbox" disabled />
        <span id="checkmark" className={checkboxStyle}></span>
      </label>
      {children}
    </div>
  );
};

export default Checkbox;
