import { StyleProp } from "../../types";

export type TextAreaProps = {
    value?: string,
    onChange?: (value: string) => void,
    onBlur?: () => void;
    onFocus?: () => void;
    placeholder?: string;
    autoComplete?: string;
    rows?: number;
    cols?: number;
    disabled?: boolean;
    maxLength?: number;
    minLength?: number;
    readOnly?: boolean;
    required?: boolean;
    style?: StyleProp
}