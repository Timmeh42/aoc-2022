module.exports = function (input) {
    const elves = [];
    let topElf = 0;
    let elf = 0;
    let calorie = 0;
    for (let s = 0; s < input.length; s++) {
        const charCode = input.charCodeAt(s)
        if (charCode === 10) {
            if (calorie === 0) {
                elves.push(elf);
                if (elf > topElf) {
                    topElf = elf;
                }
                elf = 0;
            } else {
                elf += calorie;
                calorie = 0;
            }
        } else {
            calorie = calorie * 10 + charCode - 48;
        }
    }
    elves.sort((a, b) => b - a);
    const top3 = elves.slice(0, 3).reduce((sum, x) => sum + x, 0);
    return [topElf, top3];
}