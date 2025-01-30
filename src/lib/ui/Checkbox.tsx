type CheckboxProps = {
    checked?: boolean
    onChange?: (value: boolean) => void
}

function Checkbox({checked, onChange}: CheckboxProps) {
    return (
        <input onChange={(e) => onChange(e.target.checked)} checked={checked} type="checkbox"/>
    )
}

export {
    Checkbox
}