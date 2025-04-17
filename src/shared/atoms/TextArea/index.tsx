import { ChangeEvent, useState } from "react";

import classes from "../../utils/classes";
import styles from './TextArea.module.scss';
import { TextAreaProps } from "./types";

const TextArea = ({
    value,
    onChange,
    onBlur,
    onFocus,
    placeholder,
    autoComplete,
    cols,
    maxLength,
    minLength,
    readOnly,
    required,
    rows,
    style,
}: TextAreaProps) => {
    const [initialValue, setInitialValue] = useState<string | undefined>(value);

    const onChangeValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInitialValue(e.currentTarget.value);
        onChange?.(e.currentTarget.value);
    };
  
    return (
        <textarea className={classes([styles.textarea, style])} value={initialValue} onChange={onChangeValue} onBlur={onBlur} onFocus={onFocus} placeholder={placeholder} autoComplete={autoComplete} rows={rows} cols={cols} maxLength={maxLength} minLength={minLength} readOnly={readOnly} required={required} />
    )
}

export default TextArea;