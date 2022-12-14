module.exports = function (input) {
    input = input.trim();
    const commands = input.split('\n').map(l => l.split(' '));
    const folders = new Set();
    const root = {name: '/', children: new Map(), size: 0};
    folders.add(root);
    let currentFolder = root;
    for (const command of commands) {
        if (command[0] === '$') {
            if (command[1] === 'cd') {
                const cdDestination = command[2];
                switch (cdDestination) {
                    case ('..'): {
                        currentFolder = currentFolder.parent;
                        break;
                    }
                    case ('/'): {
                        currentFolder = root;
                        break;
                    }
                    default: {
                        currentFolder = currentFolder.children.get(command[2]);
                        break;
                    }
                }
            }
        } else {
            if (command[0] === 'dir') {
                childFolder = {name: command[1], children: new Map(), size: 0, parent: currentFolder};
                currentFolder.children.set(command[1], childFolder);
                folders.add(childFolder);
                addSize(currentFolder, childFolder.size);
            } else {
                currentFolder.children.set(command[1], parseInt(command[0]));
                addSize(currentFolder, parseInt(command[0]));
            }
        }
    }
    const folderSizes = [...folders.values()].map(folder => getSize(folder));
    const part1 = folderSizes.filter(size => size <= 100000).reduce((sum, n) => n + sum, 0);
    const unused = 70000000 - getSize(root);
    const part2 = folderSizes.sort((a, b) => a - b).find(x => unused + x >= 30000000);
    return [part1, part2];
}

function getSize(folder) {
    let size = 0;
    for (let item of folder.children.values()) {
        if (typeof item === 'number') {
            size += item;
        } else {
            size += getSize(item);
        }
    }
    return size;
}

function addSize(folder, size) {
    folder.size += size;
    if (folder.parent) {
        addSize(folder.parent, size);
    }
}