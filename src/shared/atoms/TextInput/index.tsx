import { ChangeEvent, forwardRef, useImperativeHandle, useRef } from 'react';

import classes from '../../utils/classes';
import styles from './Input.module.scss';
import { TextInputProps } from './types';

const TextInput = forwardRef(({
  maxLength,
  minLength,
  name,
  placeholder,
  required = false,
  id,
  inputMode,
  onChange,
  onBlur,
  onFocus,
  type,
  value,
  isCompleted,
  style,
}: TextInputProps, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    blur: () => {
      inputRef.current?.blur();
    }
  }));

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const inputStyle = isCompleted ? `${styles.input} ${styles.input_completed}` : styles.input;

  return (
    <input
      ref={inputRef}
      className={classes([inputStyle, style])}
      type={type}
      value={value}
      onChange={onChangeValue}
      onBlur={onBlur}
      onFocus={onFocus}
      placeholder={placeholder}
      required={required}
      id={id}
      inputMode={inputMode}
      maxLength={maxLength}
      minLength={minLength}
      name={name}
    />
  );
});

export default TextInput;
