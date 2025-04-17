import { useState } from "react";

import styles from './Toggle.module.scss';
import classes from "../../utils/classes";

const Toggle = ({ isActive = false, onToggle }: { isActive?: boolean, onToggle: () => void }) => {

  const handleToggle = () => {
    onToggle();
  };

  return (
    <div
      onClick={handleToggle}
      className={classes([styles.wrapper, isActive ? styles.wrapper_active : ''])}
    >
      <div
        className={classes([styles.inside, isActive ? styles.inside_active : ''])}
      ></div>
    </div>
  );
};

export default Toggle;
