module.exports = function (input) {
    input = input.trim();
    const packs = input.split('\n');
    let part1 = 0;
    for (let pack of packs) {
        const compartment1 = new Set();
        for (let i = 0; i < pack.length; i++) {
            if (i < pack.length / 2) {
                compartment1.add(pack[i]);
            } else if (compartment1.has(pack[i])) {
                const charCode = pack.charCodeAt(i);
                const priority = charCode >= 97 ? charCode - 96 : charCode - 38;
                part1 += priority;
                break;
            }
        }
    }
    let part2 = 0;
    for (let p = 0; p < packs.length; p += 3) {
        const group = packs.slice(p, p+3);
        let badge = new Set();
        let reducing = false;
        for (let pack of group) {
            const newBadge = new Set();
            for (let i = 0; i < pack.length; i++) {
                if (reducing === false) {
                    newBadge.add(pack[i]);
                } else {
                    if (badge.has(pack[i])) {
                        newBadge.add(pack[i]);
                    }
                }
            }
            reducing = true;
            badge = newBadge;
        }
        const char = badge.values().next().value;
        const charCode = char.charCodeAt(0);
        const priority = charCode >= 97 ? charCode - 96 : charCode - 38;
        part2 += priority
    }
    return [part1, part2];
}