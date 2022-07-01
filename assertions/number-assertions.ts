export const assertEqual = (first: number, second: number): boolean => first === second; 
export const assertEqual_rounded = (first: number, second: number, accuracy: number): boolean => assertEqual(roundNumber(first, accuracy), roundNumber(second, accuracy)); 
export const assertEqual_trim = (first: number, second: number, accuracy: number): boolean => assertEqual(trimNumber(first, accuracy), trimNumber(second, accuracy)); 
export const assertEqual_withMargin = (first: number, second: number, margin: number): boolean => Math.abs(first - second) <= margin; 

const roundNumber = (num: number, accuracy: number) => Math.round(num * Math.pow(10, accuracy)) / Math.pow(10, accuracy)
const trimNumber = (num: number, accuracy: number) => Math.floor(num * Math.pow(10, accuracy)) / Math.pow(10, accuracy)