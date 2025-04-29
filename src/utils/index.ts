import { parse, isValid, endOfYear, endOfDay } from 'date-fns'

function parseWithFormats(
    dateString: string,
    formats: string[],
): { date: Date; format: string } | null {
    for (const format of formats) {
        const parsed = parse(dateString, format, new Date())
        if (isValid(parsed)) {
            const utcDate = new Date(
                Date.UTC(
                    parsed.getFullYear(),
                    parsed.getMonth(),
                    parsed.getDate(),
                ),
            )
            return { date: utcDate, format }
        }
    }
    return null
}

export function parseDateRange(
    from: string,
    to: string,
): { from: Date; to: Date } | null {
    const formats = ['yyyy-MM-dd', 'dd-MM-yyyy', 'yyyy']

    const startResult = parseWithFormats(from, formats)
    if (!startResult) return null
    const { date: startDate } = startResult

    const endResult = parseWithFormats(to, formats)
    if (!endResult) return null
    let { date: endDate, format } = endResult

    endDate = format === 'yyyy' ? endOfYear(endDate) : endOfDay(endDate)

    if (startDate > endDate) return null

    return { from: startDate, to: endDate }
}
