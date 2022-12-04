module.exports = function (input) {
    let part1 = 0;
    let part2 = 0;
    let currentNumber = 0;
    let last4 = new Uint8Array(4);
    let lastIndex = 0;
    let readingNumber = true;
    for (let s = 0; s < input.length; s++) {
        const char = input.charCodeAt(s);
        if (char >= 48 && char <=57) {
            readingNumber = true;
            currentNumber = currentNumber * 10 + char - 48;
        } else {
            if (readingNumber) {
                readingNumber = false;
                last4[lastIndex] = currentNumber;
                currentNumber = 0;
                lastIndex += 1;
                if (lastIndex === 4) {
                    lastIndex = 0;
                    if (
                        (last4[0] <= last4[2] && last4[1] >= last4[3])
                      || (last4[0] >= last4[2] && last4[1] <= last4[3])
                    ) {
                        part1++;
                    }
                    if (
                        (last4[0] <= last4[3] && last4[1] >= last4[2])
                    ) {
                        part2++;
                    }
                }
            }
        }
    }

    return [part1, part2];
}