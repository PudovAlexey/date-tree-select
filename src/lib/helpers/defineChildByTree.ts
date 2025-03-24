import { DateEnum } from "../api/types";

function defineChildByTree(level: DateEnum): DateEnum | null {
    switch (level) {
        case 'year':
            return 'month';
        case 'month':
            return 'day';
        case 'day':
            return 'hour';
        case 'hour':
            return 'minute';
        case 'minute':
            return 'second';
        default:
            return null
    }
}

export {
    defineChildByTree
}