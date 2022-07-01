import * as NumberAssertions from '../number-assertions';

describe('Test Number Assertions', () => {
    describe('assertEqual', () => {
      const dataProvider = [
        {
          first: 1,
          second: 1,
          expected: true
        },
        {
          first: 0,
          second: 0,
          expected: true
        },
        {
          first: -1,
          second: -1,
          expected: true
        },
        {
          first: 1.001,
          second: 1.001,
          expected: true
        },
        {
          first: 0.03139401,
          second: 0.03139401,
          expected: true
        },
        {
          first: -1.00002,
          second: -1.00002,
          expected: true
        },
        {
          first: 1,
          second: 2,
          expected: false
        },
        {
          first: 0,
          second: 10,
          expected: false
        },
        {
          first: -10,
          second: -1,
          expected: false
        },
        {
          first: 1.0001,
          second: 1.001,
          expected: false
        },
        {
          first: 0.03139401001,
          second: 0.03139401,
          expected: false
        },
        {
          first: -1.000022,
          second: -1.00002,
          expected: false
        }
      ]
      it.each(dataProvider)
        ('Should return if numbers are equal or not', ({ first, second, expected }) => {
          expect(NumberAssertions.assertEqual(first, second)).toStrictEqual(expected)
        })
    })
    describe('assertEqual_rounded', () => {
      const dataProvider = [
        {
          first: 1,
          second: 1,
          accuracy: 2,
          expected: true
        },
        {
          first: 0,
          second: 0,
          accuracy: 2,
          expected: true
        },
        {
          first: 1.001,
          second: 1.001,
          accuracy: 2,
          expected: true
        },
        {
          first: 0.03139401,
          second: 0.03139401,
          accuracy: 2,
          expected: true
        },
        {
          first: -1.00003,
          second: -1.00002,
          accuracy: 2,
          expected: true
        },
        {
          first: 1,
          second: 2,
          accuracy: 2,
          expected: false
        },
        {
          first: -10,
          second: -1,
          accuracy: 2,
          expected: false
        },
        {
          first: 1.0001,
          second: 1.001,
          accuracy: 2,
          expected: true
        },
        {
          first: 0.03139401001,
          second: 0.03639401,
          accuracy: 2,
          expected: false
        },
        {
          first: -1.022222,
          second: -1.02002,
          accuracy: 2,
          expected: true
        }
      ]
      it.each(dataProvider)
        ('Should return if numbers are equal or not', ({ first, second, accuracy, expected }) => {
          expect(NumberAssertions.assertEqual_rounded(first, second, accuracy)).toStrictEqual(expected)
        })
    })
    describe('assertEqual_trim', () => {
      const dataProvider = [
        {
          first: 1,
          second: 1,
          accuracy: 2,
          expected: true
        },
        {
          first: 0,
          second: 0,
          accuracy: 2,
          expected: true
        },
        {
          first: 1.001,
          second: 1.001,
          accuracy: 2,
          expected: true
        },
        {
          first: 0.03139401,
          second: 0.03139401,
          accuracy: 2,
          expected: true
        },
        {
          first: -1.00003,
          second: -1.00002,
          accuracy: 2,
          expected: true
        },
        {
          first: 1,
          second: 2,
          accuracy: 2,
          expected: false
        },
        {
          first: -10,
          second: -1,
          accuracy: 2,
          expected: false
        },
        {
          first: 1.0001,
          second: 1.001,
          accuracy: 2,
          expected: true
        },
        {
          first: 0.03139401001,
          second: 0.03639401,
          accuracy: 2,
          expected: true
        },
        {
          first: -1.022222,
          second: -1.02002,
          accuracy: 2,
          expected: true
        }
      ]
      it.each(dataProvider)
        ('Should return if numbers are equal or not', ({ first, second, accuracy, expected }) => {
          expect(NumberAssertions.assertEqual_trim(first, second, accuracy)).toStrictEqual(expected)
        })
    })
    describe('assertEqual_withMargin', () => {
      const dataProvider = [
        {
          first: 1,
          second: 3,
          margin: 1,
          expected: false
        },
        {
          first: 1,
          second: 3,
          margin: 2,
          expected: true
        },
        {
          first: 1,
          second: 3,
          margin: 3,
          expected: true
        },
        {
          first: 1.1,
          second: 1.5,
          margin: 0.5,
          expected: true
        },
        {
          first: 1.1,
          second: 1.5,
          margin: 0.2,
          expected: false
        },
        {
          first: -1.1,
          second: -1.5,
          margin: 0.2,
          expected: false
        },
        {
          first: -1.1,
          second: -1.5,
          margin: 0.5,
          expected: true
        }
      ]
      it.each(dataProvider)
        ('Should return if numbers are equal or not', ({ first, second, margin, expected }) => {
          expect(NumberAssertions.assertEqual_withMargin(first, second, margin)).toStrictEqual(expected)
        })
    })
  })