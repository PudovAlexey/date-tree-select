import React from "react";
import { DateEnum, ValueType } from "../api/types"
import { defineChildByTree } from "../helpers/defineChildByTree";
import { DateTreeSelectDropdownItem } from "./DateTreeSelectDropdownItem";

type DateTreeSelectDropdownProps<T extends DateEnum> = {
    node: ValueType<T>
    level: DateEnum | null
};

const DateTreeSelectDropdown = React.memo(function DateTreeSelectDropdown<T extends DateEnum>({ node, level = 'year' }: DateTreeSelectDropdownProps<T>) {

    if (level === null) {
        return null
    }

    return (
        <div role="presentation">
            {(node?.children || []).map((child) => {
                
                return (
                    <DateTreeSelectDropdownItem value={child}>
                       <DateTreeSelectDropdown level={defineChildByTree(level)} key={node.date} node={child} />

                   </DateTreeSelectDropdownItem>
                )
            })}
        </div>
    )
});

export {
    DateTreeSelectDropdown
}