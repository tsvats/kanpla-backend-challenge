import { parseDateRange } from './index'
import { endOfDay, endOfYear } from 'date-fns'

describe('utils', () => {
    describe('#parseDateRange', () => {
        let dateRange: { from: string; to: string }

        describe('when the date is yyyy-MM-dd format', () => {
            beforeEach(() => {
                dateRange = {
                    from: '2020-08-15',
                    to: '2020-08-20',
                }
            })

            it('should parse dates', () => {
                const result = parseDateRange(dateRange.from, dateRange.to)
                expect(result).toEqual({
                    from: new Date('2020-08-15T00:00:00.000Z'),
                    to: endOfDay(new Date('2020-08-20')),
                })
            })

            describe('when the dates are in the same day', () => {
                beforeEach(() => {
                    dateRange = {
                        from: '2020-08-15',
                        to: '2020-08-15',
                    }
                })

                it('should parse dates', () => {
                    const result = parseDateRange('2020-08-15', '2020-08-15')
                    expect(result).toEqual({
                        from: new Date('2020-08-15T00:00:00.000Z'),
                        to: endOfDay(new Date('2020-08-15')),
                    })
                })
            })

            describe('when the date are in different months', () => {
                beforeEach(() => {
                    dateRange = {
                        from: '2020-08-31',
                        to: '2020-09-01',
                    }
                })

                it('should parse dates', () => {
                    const result = parseDateRange(dateRange.from, dateRange.to)
                    expect(result).toEqual({
                        from: new Date('2020-08-31T00:00:00.000Z'),
                        to: endOfDay(new Date('2020-09-01')),
                    })
                })
            })

            describe('when the date are in different years', () => {
                beforeEach(() => {
                    dateRange = {
                        from: '2020-12-31',
                        to: '2021-01-01',
                    }
                })

                it('should parse cross-year dates', () => {
                    const result = parseDateRange(dateRange.from, dateRange.to)
                    expect(result).toEqual({
                        from: new Date('2020-12-31T00:00:00.000Z'),
                        to: endOfDay(new Date('2021-01-01')),
                    })
                })
            })
        })

        describe('when the date is dd-MM-yyyy format', () => {
            beforeEach(() => {
                dateRange = {
                    from: '15-08-2020',
                    to: '20-08-2020',
                }
            })
            it('should parse dates', () => {
                const result = parseDateRange(dateRange.from, dateRange.to)
                expect(result).toEqual({
                    from: new Date('2020-08-15T00:00:00.000Z'),
                    to: endOfDay(new Date('2020-08-20')),
                })
            })

            describe('when the dates are in the same day', () => {
                beforeEach(() => {
                    dateRange = {
                        from: '15-08-2020',
                        to: '15-08-2020',
                    }
                })

                it('should parse dates', () => {
                    const result = parseDateRange(dateRange.from, dateRange.to)
                    expect(result).toEqual({
                        from: new Date('2020-08-15T00:00:00.000Z'),
                        to: endOfDay(new Date('2020-08-15')),
                    })
                })
            })
        })

        describe('when the date is yyyy format', () => {
            describe('when the dates are in the same year', () => {
                beforeEach(() => {
                    dateRange = {
                        from: '2020',
                        to: '2020',
                    }
                })
                it('should parse dates', () => {
                    const result = parseDateRange(dateRange.from, dateRange.to)
                    expect(result).toEqual({
                        from: new Date('2020-01-01T00:00:00.000Z'),
                        to: endOfYear(new Date('2020-01-01')),
                    })
                })

                describe('when the dates are in different years', () => {
                    beforeEach(() => {
                        dateRange = {
                            from: '2020',
                            to: '2021',
                        }
                    })
                    it('should parse dates', () => {
                        const result = parseDateRange(
                            dateRange.from,
                            dateRange.to,
                        )
                        expect(result).toEqual({
                            from: new Date('2020-01-01T00:00:00.000Z'),
                            to: endOfYear(new Date('2021-01-01')),
                        })
                    })
                })
            })
        })

        describe('when mixing different formats', () => {
            describe('when mixing yyyy-MM-dd with yyyy', () => {
                it('should handle from as full date and to as year', () => {
                    const result = parseDateRange('2020-08-15', '2020')
                    expect(result).toEqual({
                        from: new Date('2020-08-15T00:00:00.000Z'),
                        to: endOfYear(new Date('2020-01-01')),
                    })
                })
            })
        })

        describe('when dates are invalid', () => {
            describe('when some date is empty', () => {
                it('should return null', () => {
                    expect(parseDateRange('', '')).toBeNull()
                    expect(parseDateRange('2020-08-15', '')).toBeNull()
                    expect(parseDateRange('', '2020-08-15')).toBeNull()
                })
            })

            describe('when the dates are in an unsupported format', () => {
                it('should return null', () => {
                    expect(
                        parseDateRange('2020/08/15', '2020/08/20'),
                    ).toBeNull()
                    expect(
                        parseDateRange('15/08/2020', '20/08/2020'),
                    ).toBeNull()
                })
            })

            describe('when the dates are invalid text', () => {
                it('should return null', () => {
                    expect(parseDateRange('invalid', '2020-08-20')).toBeNull()
                    expect(parseDateRange('2020-08-15', 'invalid')).toBeNull()
                })
            })
        })
    })
})
