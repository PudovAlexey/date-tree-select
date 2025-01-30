import React from "react";
import { DateEnum, ValueType } from "../api/types"
import { Checkbox } from "./Checkbox";

type DateTreeSelectDropdownProps<T extends DateEnum> = {
    node: ValueType<T>
    level: DateEnum
};

const DateTreeSelectDropdown = React.memo(function DateTreeSelectDropdown<T extends DateEnum>({node, level}: DateTreeSelectDropdownProps<T>) {

    console.log(node.children, 'child');

    return (
        <div>
            {node.children.map((child) => {
                console.log(child, 'cjl')
                return (
                    <div key={child.date}>
                        <div>
                            <Checkbox checked={child.checked}/>
                            <div>{child.date}</div>
                        </div>
                        <DateTreeSelectDropdown key={node.date} node={child} />
                    </div>
                )
            })}
        </div>
    )
});

export {
    DateTreeSelectDropdown
}