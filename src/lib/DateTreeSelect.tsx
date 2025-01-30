import { DateTreeSelectContextProvider } from "./model/DateTreeSelectContext"
import { DateEnum, DateTreeSelectProps } from "./api/types"
import { Select } from "./ui/Select"

function DateTreeSelect<T extends DateEnum>(props: Partial<DateTreeSelectProps<T>>) {

    return (
       <DateTreeSelectContextProvider dateTreeProps={props}>
            <Select/>
       </DateTreeSelectContextProvider>
    )
}

export {
    DateTreeSelect
}