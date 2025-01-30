import { CSSProperties } from "react";

type DateEnum = 'century' | 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

type Century = number;
type Year = number;
type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
type Time = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31
    | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 51 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60;

type FullDateTree<T> = {
    date: T | null,
    checked: boolean
    children: FullDateTree<Year>[]
};


type TimeTree = FullDateTree<Time>;
type DayTree = FullDateTree<Day>;
type MonthTree = FullDateTree<Month>;
type YearTree = FullDateTree<Year>;
type CenturyTree = FullDateTree<Century>;

type ValueType<T extends DateEnum> = T extends 'century' ? CenturyTree :
T extends 'year' ? YearTree : 
T extends 'month' ? MonthTree : T extends 'day' ? DayTree : TimeTree;

type DateTreeSelectProps<T extends DateEnum> = {
    value?: ValueType<T>,
    onChange: (value: ValueType<T>) => void
    dropDownOpen: boolean
    onDropdownOpenChange: (value: boolean) => void
    addonAfter: React.ReactNode
    addonBefore: React.ReactNode
    onClear: () => void
    disabled: boolean
    className: string
    popupClassName: string
    dropdownStyle: CSSProperties
    isAutocomplete: boolean
    startFrom: DateEnum
};

type DateTreeSelectProviderProps<T extends DateEnum> = {
    dateTreeProps: DateTreeSelectProps<T>
}

type DateTreeSelectValueProps = Pick<DateTreeSelectProps<DateEnum>, 
'dropDownOpen' | 
'onDropdownOpenChange' | 
'value' |
'addonAfter' |
'addonBefore'>

export type {
    DateTreeSelectProps,
    DateTreeSelectProviderProps,
    DateTreeSelectValueProps,
    DateEnum,
    ValueType,
}