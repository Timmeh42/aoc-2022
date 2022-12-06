module.exports = function (input) {
    input = input.trim();
    let part1 = 0;
    let part2 = 0;
    const part1Length = 4;
    const part2Length = 14;
    let start1 = 0;
    let start2 = 0;
    for (let end = 0; end < input.length; end++) {
        const endChar = input[end];
        if (!part1) {
            for (let n = start1; n < end; n++) {
                if (input[n] === endChar) {
                    start1 = n + 1;
                }
            }
            if (start1 === end - part1Length + 1) {
                part1 = end + 1;
            }
        }
        if (!part2) {
            for (let n = start2; n < end; n++) {
                if (input[n] === endChar) {
                    start2 = n + 1;
                }
            }
            if (start2 === end - part2Length + 1) {
                part2 = end + 1;
            }
        }
    }
    return [part1, part2];
}