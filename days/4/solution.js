module.exports = function (input) {
    input = input.trim();
    const elfPairs = input.split('\n').map(line => line.match(/\d+/g).map(n => parseInt(n)));
    let part1 = 0;
    let part2 = 0;
    for (let pair of elfPairs) {
        if (
            (pair[0] <= pair[2] && pair[1] >= pair[3])
          || (pair[0] >= pair[2] && pair[1] <= pair[3])
        ) {
            part1++;
        }
        if (
            (pair[0] <= pair[3] && pair[1] >= pair[2])
        ) {
            part2++;
        }
    }

    return [part1, part2];
}