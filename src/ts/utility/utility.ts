export function cleanDate(ms: number | null) {
    const newDate = new Date(Number(ms));
    if (
        !ms ||
        ms < 0 ||
        Object.prototype.toString.call(newDate) !== '[object Date]'
    ) {
        return null;
    }

    const day = newDate.getDate(),
        month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
            newDate,
        ),
        year = newDate.getFullYear();
    return `${month} ${day}, ${year}`;
}

export function cleanLength(ms: number | null) {
    if (ms === null || ms < 0 || isNaN(ms)) return null;
    let seconds = Math.round(ms / 1000);
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * 24 * 60 * 60;
    const hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * 60 * 60;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return days > 0
        ? `${days}d ${hours}h ${minutes}m ${seconds}s`
        : hours > 0
        ? `${hours}h ${minutes}m ${seconds}s`
        : minutes > 0
        ? `${minutes}m ${seconds}s`
        : `${seconds}s`;
}

//Taken from https://stackoverflow.com/a/13016136 under CC BY-SA 3.0 matching ISO 8601
export function createOffset(date = new Date()) {
    function pad(value: number) {
        return value < 10 ? `0${value}` : value;
    }

    const sign = date.getTimezoneOffset() > 0 ? '-' : '+',
        offset = Math.abs(date.getTimezoneOffset()),
        hours = pad(Math.floor(offset / 60)),
        minutes = pad(offset % 60);
    return `${sign + hours}:${minutes}`;
}

export function createRatio(first = 0, second = 0) {
    if (first === 0 || second === 0) return 0;
    return maxDecimals(first / second);
}

export function cleanTime(ms: number | null) {
    const newDate = new Date(Number(ms));
    if (
        !ms ||
        ms < 0 ||
        Object.prototype.toString.call(newDate) !== '[object Date]'
    ) {
        return null;
    }

    return newDate.toLocaleTimeString('en-IN', { hour12: true });
}

export function maxDecimals(value: number, decimals = 2) {
    const decimalValue = 10 ** decimals;
    return (
        Math.round((Number(value) + Number.EPSILON) * decimalValue) /
        decimalValue
    );
}

export function newLine(string: string) {
    return `<br>${string}`;
}

export const runtime = (chrome ?? browser);

export function timeAgo(ms: number | null) {
    if (ms === null || ms < 0 || isNaN(ms)) return null;
    return Date.now() - ms;
}

//Taken from https://github.com/slothpixel/core/blob/master/util/calculateUhcLevel.js under the MIT License
export function uhcScoreToLevel(xp: number) {
    const scores = [
        0, 10, 60, 210, 460, 960, 1710, 2710, 5210, 10210, 13210, 16210, 19210,
        22210, 25210,
    ];
    let level = 0;
    for (const score of scores) {
        if (xp >= score) level += 1;
        else break;
    }
    return level;
}