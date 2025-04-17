import { useState, useRef, useEffect } from "react";

import styles from './DropDown.module.scss';
import arrow from '../../../assets/icons/arrow_down.svg'
import classes from "../../utils/classes";

const DropDown = ({options, defaultValue, label, onSelect}: {options: string[], defaultValue?: string, label?: string, onSelect: (option: string) => void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue ? defaultValue : null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectHandler = (option: string) => {
    setSelected(option);
    onSelect?.(option);
  }

  return (
    <div className={styles.wrapper}>
        {label && <p>{label}</p>}
        <div className={styles.dropdown} ref={dropdownRef}>
            <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
                {selected || <p>Select an option</p>}
                <span><img src={arrow} alt="arrow" className={classes([styles.arrow, isOpen && styles.arrow_active])}/></span>
            </div>
            {isOpen && (
                <ul className={styles.list}>
                {options.map((option) => (
                    <li
                        key={option}
                        className={classes([styles.item, selected === option && styles.item_selected])}
                        onClick={() => {
                            selectHandler(option);
                            setIsOpen(false);
                        }}
                        >
                        <h4>{option}</h4>
                    </li>
                ))}
                </ul>
            )}
        </div>
    </div>
  );
}

export default DropDown;