import CheckIcon from '../../assets/icons16/check_icon.svg?react';
import MinusIcon from '../../assets/icons16/check_icon.svg?react';
import classNames  from  'classnames';
import cls from './select.module.css';

type CheckboxProps = {
    checked?: boolean
    onChange?: (value: boolean) => void
}

function Checkbox({ checked, onChange }: CheckboxProps) {
    return (
        <div role="presentation" onClick={() => onChange && onChange(!checked)} className={classNames(cls.checkbox, {
            [cls.checkboxChecked]: checked,
            [cls.checkboxUnchecked]: !checked
        })}>
            {checked ? <CheckIcon /> : <MinusIcon />}
        </div>
    )
}

export {
    Checkbox
}