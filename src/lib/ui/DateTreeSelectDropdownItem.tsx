import { PropsWithChildren } from "react"
import { TurnOverControl } from "./TurnOverControl"
import ChevronIcon from "../../assets/icons12/chevron_icon.svg?react";
import { useDateTreeSelectValueState } from "../model/DateTreeSelectContext";
import { ValueType } from "../api/types";
import { Checkbox } from "./Checkbox";
import cls from './select.module.css';

type DateTreeSelectDropdownItemProps<T> = {
    value: ValueType<T>
}

function DateTreeSelectDropdownItem<T>({
    value,
    children }: PropsWithChildren<DateTreeSelectDropdownItemProps<T>>) {
    const { id, date } = value;

    const {
        handleExpandedValueChange,
        handleValueChange,
        getExpandedValueById,
        getValueById,
    } = useDateTreeSelectValueState();

    const isExpandex = getExpandedValueById ? getExpandedValueById(id) : false;
    const isChecked = getValueById ? getValueById(id) : false;


    return (
        <div key={`${date}`}>
            <div className={cls.date_item}>
                <TurnOverControl isTurn={isExpandex} onClick={() => handleExpandedValueChange && handleExpandedValueChange(id)}>
                    <ChevronIcon />
                </TurnOverControl>
                <Checkbox onChange={() => handleValueChange && handleValueChange(id)} checked={isChecked} />
                <div>{`${date}`}</div>
            </div>
            <div className={cls.deep}>
                {!isExpandex && children}
            </div>
        </div>
    )
}

export {
    DateTreeSelectDropdownItem
}