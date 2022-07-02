import winston from 'winston';
import { LogLevel, NumberEqualityPolicy } from '../enums';
import * as NumberAssertions from '../assertions/number-assertions'; 

export default class Lantern {
    private logger: winston.Logger;
    private logLevel: LogLevel;

    public numberEqualityPolicy: NumberEqualityPolicy = NumberEqualityPolicy.FULLY_EQUAL;
    public accuracy: number = 2;
    public errorMargin: number = 0;

    public constructor(logger: winston.Logger, logLevel: LogLevel) {
        this.logger = logger;
        this.logLevel = logLevel;
    }

    public illuminate(expected: string, actual: any): boolean;
    public illuminate(expected: number, actual: any): boolean;
    public illuminate(expected: Object, actual: any): boolean;
    public illuminate(expected: number | string | Object, actual: any): boolean {
        if (typeof expected === "string") {
            return this.illuminateString(expected, actual)
        } else if (typeof expected === "number") {
            return this.illuminateNumber(expected, actual)
        } else if (typeof expected === "object") {
            return this.illuminateObject(expected, actual)
        }

        return false;
    }

    private illuminateString(expected: string, actual: any): boolean {
        return false;
    }

    private illuminateNumber(expected: number, actual: any): boolean {
        if (actual !== 0 && !actual) {
            this.log(`Mismatch! { { "expected": ${expected}, "actual": ${actual} } }`);
            return false;
        }

        if (typeof actual !== "number") {
            this.log(`Type Mismatch! { { "expected": ${expected}, "typeOfActual": "${typeof actual}", "actual": "${actual}" } }`);
            return false;
        }

        if (this.numberEqualityPolicy === NumberEqualityPolicy.FULLY_EQUAL && !NumberAssertions.assertEqual(expected, actual)) {
            this.log(`Mismatch! { "expected": ${expected}, "actual": ${actual} }`);
            return false;
        } else if (this.numberEqualityPolicy === NumberEqualityPolicy.ROUND && !NumberAssertions.assertEqual_rounded(expected, actual, this.accuracy)) {
            this.log(`Mismatch! { "expected": ${expected}, "actual": ${actual} }`);
            return false;
        } else if (this.numberEqualityPolicy === NumberEqualityPolicy.TRIM && !NumberAssertions.assertEqual_trim(expected, actual, this.accuracy)) {
            this.log(`Mismatch! { "expected": ${expected}, "actual": ${actual} }`);
            return false;
        } else if (this.numberEqualityPolicy === NumberEqualityPolicy.MARGIN && !NumberAssertions.assertEqual_withMargin(expected, actual, this.errorMargin)) {
            this.log(`Mismatch! { "expected": ${expected}, "actual": ${actual} }`);
            return false;
        }

        return true;
    }

    private illuminateObject(expected: Object, actual: any): boolean {
        return false;
    }

    private log = (message: string) : void => {
        if (this.logLevel === LogLevel.INFO) {
            this.logger.info(message);
        } else if (this.logLevel === LogLevel.WARN) {
            this.logger.warn(message);
        } else if (this.logLevel === LogLevel.ERROR) {
            this.logger.error(message);
        }
    }
}