function DefineDropdownPosition(
    dropdown: HTMLDivElement,
    input: HTMLDivElement
) {
    const {x, y, height, width} = input.getBoundingClientRect();

    dropdown.style.left =   `${x}px`;
    dropdown.style.top = `${y + height}px`;
    dropdown.style.width = `${width}px`

    return {
        left: `${x}px`,
        top: `${y + height}px`,
        width: `${width}px`,
    }
}

export {
    DefineDropdownPosition
}