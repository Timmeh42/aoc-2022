module.exports = function (input) {
    input = input.trim();
    const treeMap = input.split('\n').map(line => line.split('').map(x => parseInt(x)));
    const vizMap = input.split('\n').map(line => line.split('').map(_ => false));
    const scenicMap = input.split('\n').map(line => line.split('').map(_ => 1));
    for (let y = 0; y < treeMap.length; y++) {
        let tallestLeft = 0;
        let viewHeights = Array.from({length: 10}, () => 0);
        for (let x = 0; x < treeMap[0].length; x++) {
            const treeHeight = treeMap[y][x];
            if (x === 0 || y === 0 || x === treeMap.length - 1 || y === treeMap[0].length - 1) {
                tallestLeft = treeHeight;
                vizMap[y][x] = true;
                scenicMap[y][x] *= 0;
            } else {
                if (treeHeight > tallestLeft) {
                    tallestLeft = treeHeight;
                    vizMap[y][x] = true;
                }
                scenicMap[y][x] *= x - Math.min(...viewHeights.slice(treeHeight));
            }
            for (let n = treeHeight; n < 9; n++) {
                viewHeights[treeHeight] = viewHeights[treeHeight] || x;
            }
        }
        let tallestRight = 0;
        viewHeights = Array.from({length: 10}, () => treeMap.length - 1);
        for (let x = treeMap[0].length - 1; x >= 0; x--) {
            const treeHeight = treeMap[y][x];
            if (x === 0 || y === 0 || x === treeMap.length - 1 || y === treeMap[0].length - 1) {
                tallestRight = treeHeight;
                vizMap[y][x] = true;
                scenicMap[y][x] *= 0;
            } else {
                if (treeHeight > tallestRight) {
                    tallestRight = treeHeight;
                    vizMap[y][x] = true;
                }
                scenicMap[y][x] *= Math.min(...viewHeights.slice(treeHeight)) - x;
            }
            for (let n = treeHeight; n < 9; n++) {
                viewHeights[treeHeight] = viewHeights[treeHeight] || x;
            }
        }
    }
    for (let x = 0; x < treeMap[0].length; x++) {
        let tallestTop = 0;
        let viewHeights = Array.from({length: 10}, () => 0);
        for (let y = 0; y < treeMap.length; y++) {
            const treeHeight = treeMap[y][x];
            if (x === 0 || y === 0 || x === treeMap.length - 1 || y === treeMap[0].length - 1) {
                tallestTop = treeHeight;
                vizMap[y][x] = true;
                scenicMap[y][x] *= 0;
            } else {
                if (treeHeight > tallestTop) {
                    tallestTop = treeHeight;
                    vizMap[y][x] = true;
                }
                scenicMap[y][x] *= y - Math.min(...viewHeights.slice(treeHeight));
            }
            for (let n = treeHeight; n < 9; n++) {
                viewHeights[treeHeight] = viewHeights[treeHeight] || y;
            }
        }
        let tallestBottom = 0;
        viewHeights = Array.from({length: 10}, () => treeMap.length - 1);
        for (let y = treeMap.length - 1; y > 0; y--) {
            const treeHeight = treeMap[y][x];
            if (x === 0 || y === 0 || x === treeMap.length - 1 || y === treeMap[0].length - 1) {
                tallestBottom = treeHeight;
                vizMap[y][x] = true;
                scenicMap[y][x] *= 0;
            } else {
                if (treeHeight > tallestBottom) {
                    tallestBottom = treeHeight;
                    vizMap[y][x] = true;
                }
                scenicMap[y][x] *= Math.min(...viewHeights.slice(treeHeight)) - y;
            }
            for (let n = treeHeight; n < 9; n++) {
                viewHeights[treeHeight] = viewHeights[treeHeight] || y;
            }
        }
    }
    const part1 = vizMap.flat().filter(v => v).length;
    const part2 = Math.max(...scenicMap.flat());
    console.log(scenicMap)
    return [part1, part2];
}