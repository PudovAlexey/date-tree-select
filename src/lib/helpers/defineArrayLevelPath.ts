import { DateEnum } from "../api/types";

function defineArrayLevelPath(current: DateEnum) {
    const fullPath = ['year', 'month', 'day', 'hour', 'minute', 'second'];

    const res = [];
    let start = false
    for (let i = 0; i< fullPath.length; i++) {

        if (start || fullPath[i] === current) {
            res.push(fullPath[i])
            start = true;
        }
    }

    return res
}

export {
    defineArrayLevelPath
}