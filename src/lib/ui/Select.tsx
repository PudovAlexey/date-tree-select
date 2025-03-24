import { createPortal } from 'react-dom';
import cls from './select.module.css';
import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { useDateTreeSelectValueState } from '../model/DateTreeSelectContext';
import { DefineDropdownPosition } from '../helpers/defineDropdownPosition';
import { SchevronDownIcon } from './SchevronDownIcon';
import { TurnOverControl } from './TurnOverControl';
import { DateTreeSelect } from '../DateTreeSelect';
import { DateTreeSelectDropdown } from './DateTreeSelectDropdown';
import { DateEnum } from '../api/types';

function Select<T extends DateEnum>() {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);
    const {dropDownOpen, addonAfter, value, addonBefore, onDropdownOpenChange} = useDateTreeSelectValueState();

    useEffect(() => {
        if (inputRef.current && dropdownRef.current) {
            DefineDropdownPosition(dropdownRef.current, inputRef.current);
        }

        if (inputRef.current && dropDownOpen && dropdownRef.current) {
            const wrapperHeight = (dropdownRef.current.children[0] as HTMLDivElement).offsetHeight;
            dropdownRef.current.style.height = `${wrapperHeight}px`;
        } else if (inputRef.current && !dropDownOpen && dropdownRef.current) {
            dropdownRef.current.style.height = '0px';
        }
    }, [dropDownOpen]);

    return (
        <div>
            <div role="presentation" onClick={onDropdownOpenChange} ref={inputRef} className={cls.select}>
                <div>
                {addonBefore}
                </div>
                <input/>
                <div className={cls.schevron}>
                {addonAfter}
                <TurnOverControl isTurn={!!dropDownOpen}>
                <SchevronDownIcon/>
                </TurnOverControl>
                </div>
            </div>
            {createPortal(<div ref={dropdownRef} className={classNames(cls.dropdown, cls.open_animate)}>
            <div className={cls.drowdown_wrapper}>
            <DateTreeSelectDropdown level={'year'} node={value}/>
            </div>
            </div>, document.body)}
        </div>
    )
}

export {
    Select
}