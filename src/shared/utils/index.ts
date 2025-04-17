import { useEffect,useState } from "react";

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => clearTimeout(handler);
    }, [value, delay]);
  
    return debouncedValue;
  };

const getRandomDistinctHslColor = () => {
    const numberOfColors = 50;

    const hue = Math.floor(Math.random() * numberOfColors) * 137.508;
    const lightness = Math.floor(Math.random() * numberOfColors) + 30;
    return `hsl(${hue}, 50%, ${lightness}%)`;
  }

const numberToLetters = (n: number) => {
    let result = '';
    while (n > 0) {
        n--; // Смещение, так как алфавит начинается с 1, а индексы с 0
        result = String.fromCharCode(97 + (n % 26)) + result;
        n = Math.floor(n / 26);
    }
    return result;
}

const toFixedWithoutRoundation = (n: number, fixed: number) => `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))?.[0];

export {getRandomDistinctHslColor, useDebounce, numberToLetters, toFixedWithoutRoundation};
