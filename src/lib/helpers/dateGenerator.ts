import { DateEnum, Day, DayTree, Month, MonthTree, Time, TimeTree, ValueType } from "../api/types";
import { defineArrayLevelPath } from "./defineArrayLevelPath";

type DateGeneratiorProps<T extends DateEnum> = {
    year?: number[]
    filter: (value: number, index: number, array: number[], leaf: T) => boolean
    start: T
    end: T
};


function generateTime<T extends DateEnum>({ filterValues, token }: { filterValues: DateGeneratiorProps<T>['filter'], token: DateEnum}): TimeTree[] {
    const genToken = defineArrayLevelPath(token);

    return new Array(60)
        .fill('')
        .map((_, idx) => idx + 1)
        .filter((itm, idx, array) => filterValues(itm, idx, array, token as T))
        .map((item) => ({
            date: item as Time,
            label: '', // Здесь можно добавить логику для создания метки
            checked: false,
            children: (genToken[1] ? generateTime({
                filterValues,
                token: genToken[1] as DateEnum // Убедитесь, что genToken[1] действительно является DateEnum
            }) : []) as TimeTree[]
        }));
}

function generateDays({
    currentYear,
    currentMonth,
    filterValues,
}: { currentYear: number, currentMonth: number, filterValues: DateGeneratiorProps<'day'>['filter'] }): DayTree[] {

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0)
        .getDate();

    const days: number[] = [];

    for (let i = 0; i <= daysInMonth; i++) {
        days.push(i)
    }

    return days
        .filter((item, index, array) => filterValues(item, index, array, 'day'))
        .map((day) => ({
            date: day as Day,
            label: `${day}`,
            checked: false,
            children: generateTime({
                filterValues: filterValues as DateGeneratiorProps<'day'>['filter'],
                token: 'hour',
            })
        }))
}

function generateMonths({ currentYear, filterValues }: { currentYear: number, filterValues: DateGeneratiorProps<'month'>['filter'] }): MonthTree[] {


    return new Array(12)
        .fill('')
        .map((_, idx) => idx + 1)
        .filter((_, index, array) => filterValues(index + 1, index, array, 'month'))
        .map((month) => ({
            date: (month + 1) as Month,
            label: `${(month + 1)}`,
            checked: false,
            children: generateDays({
                currentMonth: month + 1,
                currentYear,
                filterValues: filterValues as unknown as DateGeneratiorProps<'day'>['filter'],
            }) as DayTree[]
        }))

};

function generateYear({
    filterValues,
    year
}: { filterValues: DateGeneratiorProps<'year'>['filter'], year?: number[] }): ValueType<'year'>[] {

    let resolvedYears: number[] = [];

    if (year) {
        const year = new Date().getFullYear();

        const plus = new Array(5).fill('').map((_, i) => year + i + 1);
        const minus = new Array(5).fill('').map((_, i) => year - i + 1);

        resolvedYears = [...minus, year, ...plus];

        // resolvedYears = year
    };


    return resolvedYears
        .filter((el, index, array) => filterValues(el, index, array, 'year'))
        .map((year) => ({
            date: year,
            label: `${year}`,
            checked: false,
            children: []
        }));
}

function dateGenerator<T extends DateEnum>({ start, end, year, filter }: DateGeneratiorProps<T>): ValueType<T> {
    switch (start) {
        case 'year': return {
            date: 'root',
            label: 'root',
            checked: false,
            children: generateYear({
                filterValues: filter as DateGeneratiorProps<'year'>['filter'],
                year,
            }) as unknown as ValueType<T>
        };
        case 'month': return {
            date: 'root',
            label: 'root',
            checked: false,
            children: generateMonths({
                currentYear: 2024,
                filterValues: filter as DateGeneratiorProps<'month'>['filter'],
            }),
        };
        case 'day': return {
            date: 'root',
            checked: false,
            children: generateDays({
                currentYear: 2024,
                currentMonth: 1,
                filterValues: filter as DateGeneratiorProps<'day'>['filter'],
            })
        }
        case 'hour': return {
            node: 'root',
            checked: false,
            label: 'root',
            children: generateTime({
                filterValues: filter as DateGeneratiorProps<'hour'>['filter'],
                token: 'hour'
            })
        }
        case 'minute': return {
            node: 'root',
            checked: false,
            label: 'root',
            children: generateTime({
                filterValues: filter as DateGeneratiorProps<'minute'>['filter'],
                token: 'minute'
            }),
        }
        case 'second': return {
            node: 'root',
            checked: false,
            label: 'root',
            children: generateTime({
                filterValues: filter as DateGeneratiorProps<'second'>['filter'],
                token: 'second'
            }),
        }
        default: return [] as unknown as ValueType<T>
    }
};

export {
    dateGenerator
}
