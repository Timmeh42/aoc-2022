module.exports = function (input) {
    input = input.trim().replaceAll('A', 0).replaceAll('B', 1).replaceAll('C', 2).replaceAll('X', 0).replaceAll('Y', 1).replaceAll('Z', 2);
    const rounds = input.split('\n').map(round => round.split(' ').map(n => parseInt(n)));
    let part1 = 0;
    let part2 = 0;
    for (let round of rounds) {
        if ((round[0] + 1) % 3 === round[1]) {
            part1 += 6;
        } else if (round[0] === round[1]) {
            part1 += 3;
        }
        if (round[1] === 2) {
            part2 += 6 + (round[0] + 1) % 3
        } else if (round[1] === 1) {
            part2 += 3 + round[0]
        } else {
            part2 += (round[0] + 2) % 3
        }
        part1 += round[1] + 1;
        part2 += 1;
    }
    return [part1, part2];
}