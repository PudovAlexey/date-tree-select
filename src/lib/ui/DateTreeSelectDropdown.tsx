import React from "react";
import { DateEnum, ValueType } from "../api/types"

type DateTreeSelectDropdownProps<T extends DateEnum> = {
    node: ValueType<T>
};

const DateTreeSelectDropdown = React.memo(function DateTreeSelectDropdown<T extends DateEnum>({node}: DateTreeSelectDropdownProps<T>) {

    console.log(node.children, 'child');

    return (
        <div>
            {node.children.map((child) => {
                console.log(child, 'cjl')
                return (
                    <div key={child.date}>
                        Hello world
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