import Lantern from '../lantern';
import winston from 'winston';
import { LogLevel, NumberEqualityPolicy } from '../../enums';

describe('Tests Lantern', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    describe('Illuminate Numbers Output', () => {
        const logger: winston.Logger = winston.createLogger();
        const infoLog = jest.spyOn(logger, "info");
        const lantern: Lantern = new Lantern(logger, LogLevel.INFO);
        
        const dataProvider = [
            {
                first: 1,
                second: 1,
                numberEqualityPolicy: NumberEqualityPolicy.FULLY_EQUAL,
                accuracy: 2,
                margin: 1,
                expected: true
            },
            {
                first: 1,
                second: 2,
                numberEqualityPolicy: NumberEqualityPolicy.FULLY_EQUAL,
                accuracy: 2,
                margin: 1,
                expected: false
            },
            {
                first: 0,
                second: 0,
                numberEqualityPolicy: NumberEqualityPolicy.FULLY_EQUAL,
                accuracy: 2,
                margin: 1,
                expected: true
            },
            {
                first: -1,
                second: -1,
                numberEqualityPolicy: NumberEqualityPolicy.FULLY_EQUAL,
                accuracy: 2,
                margin: 1,
                expected: true
            },
            {
                first: 1,
                second: "1",
                numberEqualityPolicy: NumberEqualityPolicy.FULLY_EQUAL,
                accuracy: 2,
                margin: 1,
                expected: false
            },
            {
                first: 1,
                second: 2,
                numberEqualityPolicy: NumberEqualityPolicy.MARGIN,
                accuracy: 2,
                margin: 2,
                expected: true
            },
            {
                first: 1.0122,
                second: 1.0123,
                numberEqualityPolicy: NumberEqualityPolicy.ROUND,
                accuracy: 2,
                margin: 1,
                expected: true
            },
            {
                first: 1.0122,
                second: 1.0123,
                numberEqualityPolicy: NumberEqualityPolicy.TRIM,
                accuracy: 2,
                margin: 1,
                expected: true
            },
            {
                first: 1.0122,
                second: 1.0123,
                numberEqualityPolicy: NumberEqualityPolicy.MARGIN,
                accuracy: 1,
                margin: 1,
                expected: true
            },
            {
                first: 1.0122,
                second: 1.0155,
                numberEqualityPolicy: NumberEqualityPolicy.ROUND,
                accuracy: 2,
                margin: 1,
                expected: false
            },
            {
                first: 1.0122,
                second: 1.0125,
                numberEqualityPolicy: NumberEqualityPolicy.TRIM,
                accuracy: 2,
                margin: 1,
                expected: true
            }
        ]
        it.each(dataProvider)
            ('Should illuminate given numbers', ({ first, second, numberEqualityPolicy, accuracy, margin, expected }) => {
                lantern.numberEqualityPolicy = numberEqualityPolicy;
                lantern.accuracy = accuracy;
                lantern.errorMargin = margin;
                expect(lantern.illuminate(first, second)).toStrictEqual(expected);
            })
    })
    describe('Illuminate Numbers Logs', () => {
        const logger: winston.Logger = winston.createLogger();
        const infoLog = jest.spyOn(logger, "info");
        const lantern: Lantern = new Lantern(logger, LogLevel.INFO);
        
        const dataProvider = [
            {
                first: 1,
                second: 2,
                numberEqualityPolicy: NumberEqualityPolicy.FULLY_EQUAL,
                accuracy: 2,
                margin: 1,
                expectedLogMessage: 'Mismatch! { "expected": 1, "actual": 2 }'
            },
            {
                first: 1,
                second: 1.1,
                numberEqualityPolicy: NumberEqualityPolicy.FULLY_EQUAL,
                accuracy: 2,
                margin: 1,
                expectedLogMessage: 'Mismatch! { "expected": 1, "actual": 1.1 }'
            },
            {
                first: 1.223,
                second: 1.133,
                numberEqualityPolicy: NumberEqualityPolicy.ROUND,
                accuracy: 1,
                margin: 1,
                expectedLogMessage: 'Mismatch! { "expected": 1.223, "actual": 1.133 }'
            },
            {
                first: 1.223,
                second: 1.133,
                numberEqualityPolicy: NumberEqualityPolicy.TRIM,
                accuracy: 1,
                margin: 1,
                expectedLogMessage: 'Mismatch! { "expected": 1.223, "actual": 1.133 }'
            },
            {
                first: 1.223,
                second: 1.933,
                numberEqualityPolicy: NumberEqualityPolicy.MARGIN,
                accuracy: 1,
                margin: 0.5,
                expectedLogMessage: 'Mismatch! { "expected": 1.223, "actual": 1.933 }'
            },
            {
                first: 1,
                second: "asd",
                numberEqualityPolicy: NumberEqualityPolicy.FULLY_EQUAL,
                accuracy: 2,
                margin: 1,
                expectedLogMessage: 'Type Mismatch! { { "expected": 1, "typeOfActual": "string", "actual": "asd" } }'
            }
        ]
        it.each(dataProvider)
            ('Should illuminate given numbers', ({ first, second, numberEqualityPolicy, accuracy, margin, expectedLogMessage }) => {
                lantern.numberEqualityPolicy = numberEqualityPolicy;
                lantern.accuracy = accuracy;
                lantern.errorMargin = margin;
                expect(lantern.illuminate(first, second)).toStrictEqual(false);
                expect(infoLog).toHaveBeenCalledWith(expectedLogMessage);
            })
    })
})
