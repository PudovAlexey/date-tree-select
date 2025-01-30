import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useRef, useState } from "react";
import { DateEnum, DateTreeSelectProviderProps, DateTreeSelectValueProps, ValueType } from "../api/types";

const DateTreeSelectContext = createContext<Partial<DateTreeSelectValueProps>>({});

function DateTreeSelectContextProvider<T extends DateEnum>({dateTreeProps ,children}: PropsWithChildren<Partial<DateTreeSelectProviderProps<T>>>) {
    const [open, setOpen] = useState(true);

    const [value, setValue] = useState<ValueType<T>>({
        date: null,
        checked: false,
        children: [{
            date: 2024,
            checked: false,
            children: []
        }]
    });

    // const dropDownOpen = useMemo(() => open || !!dateTreeProps?.dropDownOpen, [open, dateTreeProps?.dropDownOpen]);

    const handleDropdownChange = useCallback(() => {
        setOpen(!open)
    }, [open]);

    const handleDropdownValueChange = useCallback((level: DateEnum, node: ValueType<T>) => {

    }, []);

    return (
        <DateTreeSelectContext.Provider value={useMemo(() => ({
            dropDownOpen: open,
            addonAfter: dateTreeProps?.addonAfter,
            addonBefore: dateTreeProps?.addonBefore,
            value: value,
            onDropdownOpenChange: handleDropdownChange,

        }), [
            open,
            dateTreeProps?.addonAfter,
            dateTreeProps?.addonBefore,
            value,
            handleDropdownChange
        ])}>
            {children}
        </DateTreeSelectContext.Provider>
    )
}

const useDateTreeSelectValueState = () => {
    return useContext(DateTreeSelectContext)
}

export {
    DateTreeSelectContextProvider,
    useDateTreeSelectValueState
}