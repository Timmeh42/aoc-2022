module.exports = function (input) {
    input = input.trim();
    const lines = input.split('\n').map(l => l.split(' -> ').map(s => s.split(',').map(n => parseInt(n))));
    const maxY = Math.max(...lines.flat(1).map(p => p[1]));
    const map = new Set();
    for (const line of lines) {
        let curX = line[0][0];
        let curY = line[0][1];
        map.add(curX * 500 + curY);
        for (const segment of line.slice(1)) {
            while (curX != segment[0] || curY != segment[1]) {
                if (curX != segment[0]) curX += Math.sign(segment[0] - curX);
                if (curY != segment[1]) curY += Math.sign(segment[1] - curY);
                map.add(curX * 500 + curY);
            }
        }
    }
    let sands = 0;
    sim:
    while (true) {
        let sand = [500, 0];
        sands ++;
        sand:
        while (true) {
            if (sand[1] > maxY) {
                break sim;
            }
            if (map.has(sand[0] * 500 + sand[1] + 1) === false) {
                sand[1] += 1;
            } else if (map.has((sand[0] - 1) * 500 + sand[1] + 1) === false) {
                sand[1] += 1;
                sand[0] -= 1;
            } else if (map.has((sand[0] + 1) * 500 + sand[1] + 1) === false) {
                sand[1] += 1;
                sand[0] += 1;
            } else {
                map.add(sand[0] * 500 + sand[1]);
                break sand;
            }
        }
    }
    const part1 = sands - 1;

    sim2:
    while (true) {
        let sand = [500, 0];
        sands ++;
        sand2:
        while (true) {
            if (map.has(sand[0] * 500 + sand[1] + 1) === false && sand[1] !== maxY + 1) {
                sand[1] += 1;
            } else if (map.has((sand[0] - 1) * 500 + sand[1] + 1) === false && sand[1] !== maxY + 1) {
                sand[1] += 1;
                sand[0] -= 1;
            } else if (map.has((sand[0] + 1) * 500 + sand[1] + 1) === false && sand[1] !== maxY + 1) {
                sand[1] += 1;
                sand[0] += 1;
            } else if (sand[0] === 500 && sand[1] === 0) {
                break sim2;
            } else {
                map.add(sand[0] * 500 + sand[1]);
                break sand2;
            }
        }
    }
    const part2 = sands - 1;
    return [part1, part2];
}