var player;

keyCodes = {
    37: 'l',
    38: 't',
    39: 'r',
    40: 'b'
}

var inverseMoves={
    'l': 'r',
    'r': 'l',
    't': 'b',
    'b': 't',
}

function initPlayer() {
    player = $('#player');
    var half = Math.floor(TileSize / 2)
    var size = TileSize - half;
    player.height(size).width(size);
    player.css("margin", half / 2 + "px");

    writeOnConsole("Initialized Player")
}

function resetPlayer() {
    player = $('#player');
    player.css({
        top: 0,
        left: 0
    });
}

function move(dir) {
    if (typeof dir == 'number') dir = keyCodes[dir];

    if (!canMove(dir)) return true;

    player.finish();
    var pos = player.position();
    switch (dir) {
        case 't':
            pos.top -= TileSize;
            break;
        case 'b':
            pos.top += TileSize;
            break;
        case 'l':
            pos.left -= TileSize;
            break;
        case 'r':
            pos.left += TileSize;
            break;
        default:
            return true;
    }
    if (!dev)
        player.animate(pos, 75)
    else
        player.css(pos)
}

function canMove(dir) {
    var pos = player.position();
    if (pos.top == 0 && pos.left == 0 && dir == 'l') return false;

    var tileUnderPlayer = getTileAtPos(pos);
    if (tileUnderPlayer.length == 0) return false;

    var classesOfTile = tileUnderPlayer.attr('class').split(' ');
    if (classesOfTile.indexOf(dir) > -1) return true;
    return false
}

function getTileAtPos(pos) {
    var id = `#${pos.left/TileSize}-${pos.top/TileSize}`;
    return $(id);
}

function getPossibleDirs(id) {
    var div = $(id);
    if (div.length == 0) return false;

    var dirs = div.attr("class").replace("cell ", '').split(' ');
    if (id == '#0-0') dirs = dirs.splice(1);
    if (id == `#${size-1}-${size-1}`) dirs = removeCellFromArray(dirs, 'r');

    return dirs;
}


function dirsToActions(dirs) {
    var dir = {
            "l": 0,
            'r': 3,
            't': 1,
            'b': 2
        },
        actions = [];
    for (var i = 0; i < dirs.length; i++) {
        actions.push(dir[dirs[i]]);
    }
    return actions;
}

function getClosedEnds() {
    var closedEnds = [];
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {

            if ((i == 0 && j == 0) || (i == size - 1 && j == size - 1)) continue;
            var id = `#${j}-${i}`;
            var dirs = getPossibleDirs(id);

            if (dirs.length == 1) {
                closedEnds.push(i * size + j);
            }

        }
    }
    return closedEnds;
}