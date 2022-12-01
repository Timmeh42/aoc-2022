module.exports = function (input) {
    const elves = input.trim()
        .split('\n\n')
        .map(e => e.split('\n')
            .map(n => parseInt(n))
            .reduce((sum, n) => sum + n, 0)
        );
    const part1 = Math.max(...elves);
    elves.sort((a, b) => b - a);
    const part2 = elves.slice(0, 3).reduce((sum, n) => sum + n, 0)
    return [part1, part2];
}