module.exports = function (input) {
    const [stackInput, instructionsInput] = input.trimEnd().split('\n\n');
    const instructions = instructionsInput.split('\n').map(line => line.match(/\d+/g).map(n => parseInt(n)));

    const stackCount = parseInt(stackInput[stackInput.length - 2]);
    let stacks = Array.from({ length: stackCount }, () => []);
    let x = 0;
    for (let s = 0; s < stackInput.length; s++) {
        const char = stackInput.charCodeAt(s);
        if (char === 10) {
            x = 0;
        } else {
            if (char >= 65 && char <= 90) {
                stackId = (x - 1) / 4;
                stacks[stackId].push(stackInput[s])
            }
            x++;
        }
    }
    stacks.forEach(stack => stack.reverse());

    for (const [count, source, sink] of instructions) {
        for (let n = 0; n < count; n++) {
            stacks[sink - 1].push(stacks[source - 1].pop());
        }
    }
    const part1 = stacks.reduce((str, stack) => str + stack.pop(), '');

    stacks = Array.from({ length: stackCount }, () => []);
    x = 0;
    for (let s = 0; s < stackInput.length; s++) {
        const char = stackInput.charCodeAt(s);
        if (char === 10) {
            x = 0;
        } else {
            if (char >= 65 && char <= 90) {
                stackId = (x - 1) / 4;
                stacks[stackId].push(stackInput[s])
            }
            x++;
        }
    }
    stacks.forEach(stack => stack.reverse());

    for (const [count, source, sink] of instructions) {
        stacks[sink - 1].push(...stacks[source - 1].splice(-count, count));
    }
    const part2 = stacks.reduce((str, stack) => str + stack.pop(), '');

    return [part1, part2];
}