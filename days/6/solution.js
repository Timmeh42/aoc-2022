module.exports = function (input) {
    input = input.trim();
    let part1 = 0;
    let part2 = 0;
    const part1Length = 4;
    const part2Length = 14;
    for (let s = 0; s < input.length; s++) {
        if (part1 === 0) {
            const buffer1 = new Set(input.slice(s - part1Length, s));
            if (buffer1.size === part1Length) {
                part1 = s;
            }
        }
        if (part2 === 0) {
            const buffer2 = new Set(input.slice(s - part2Length, s));
            if (buffer2.size === part2Length) {
                part2 = s;
                break;
            }
        }
    }
    return [part1, part2];
}