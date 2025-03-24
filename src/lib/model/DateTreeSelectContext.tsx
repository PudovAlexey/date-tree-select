import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useRef, useState } from "react";
import { DateEnum, DateTreeSelectProviderProps, DateTreeSelectValueProps, SelectionDict, ValueType } from "../api/types";

const DateTreeSelectContext = createContext<Partial<DateTreeSelectValueProps & {
    handleExpandedValueChange: (id: string) => void;
    handleValueChange: (id: string) => void;
    getExpandedValueById: (id: string) => boolean;
    getValueById: (id: string) => boolean;
}>>({});

function DateTreeSelectContextProvider<T extends DateEnum>({ dateTreeProps, children }: PropsWithChildren<Partial<DateTreeSelectProviderProps<T>>>) {
    const [open, setOpen] = useState(true);
    const [checkedDict, setCheckedDict] = useState<SelectionDict>({});
    const [expandedDict, setExpandedDict] = useState<SelectionDict>({});

    const [value, setValue] = useState<ValueType<T>>({
        id: 'root',
        date: 'root',
        children: [{
            id: `root%_%${2024}`,
            date: 2024,
            children: [
                {
                    id: `root%_%${2024}%_%${1}`,
                    date: 1,
                    children: []
                }
            ]
        }]
    });

    // const dropDownOpen = useMemo(() => open || !!dateTreeProps?.dropDownOpen, [open, dateTreeProps?.dropDownOpen]);

    const handleDropdownChange = useCallback(() => {
        setOpen(!open)
    }, [open]);

    const handleExpandedValueChange = useCallback((id: string) => {
        setExpandedDict((prev) => {
            return {
                ...prev,
                [id]: !prev?.[id]
            }
        });
    }, []);

    const handleValueChange = useCallback((id: string) => {
        setCheckedDict((prev) => {
            return {
                ...prev,
                [id]: !prev?.[id]
            }
        })

    }, []);

    const getExpandedValueById = useCallback((id: string) => {
            return expandedDict?.[id];
    }, [expandedDict]);

    const getValueById = useCallback((id: string) => {
        return checkedDict?.[id];
}, [checkedDict]);

    return (
        <DateTreeSelectContext.Provider value={useMemo(() => ({
            dropDownOpen: open,
            addonAfter: dateTreeProps?.addonAfter,
            addonBefore: dateTreeProps?.addonBefore,
            value,
            handleDropdownChange,
            handleExpandedValueChange,
            handleValueChange,
            getExpandedValueById,
            getValueById,
            // getValueById,
            // onDropdownOpenChange: handleDropdownChange,
            // handleExpandedValueChange,
            // handleValueChange,

        }), [
            open,
            dateTreeProps?.addonAfter,
            dateTreeProps?.addonBefore,
            value,
            handleDropdownChange,
            handleExpandedValueChange,
            handleValueChange,
            getExpandedValueById,
            getValueById,
            // getCheckedValueById,
            // handleDropdownChange,
            // handleDropdownExpandChange,
            // handleDropdownValueChange,
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