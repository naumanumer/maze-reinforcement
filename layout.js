var board = $('#board');
var TileSize = 25;
var size = 10
var dev = false;
var cells = [];

function initGame() {
    cells = [];
    $("#board").height(size * TileSize);
    $("#board").width(size * TileSize);

    var boardHtml = '<div id="player"></div>';
    var n = 0,
        k = 0;

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {

            boardHtml += `<div class="cell" style="left:${j * TileSize}px;top: ${i * TileSize}px;height: ${TileSize - 1}px;width:${TileSize - 1}px" id="${j}-${i}">`;
            boardHtml += "</div>";

            cells.push(`#${j}-${i}`);
            n++;
        }
    }

    $(board).html(boardHtml);

    initPlayer()
    generateMaze();

    writeOnConsole(`Initialized ${size}x${size} Game Board`)
    writeOnConsole(" ")

    initAgent();

    $("#board .cell").click(function () {
        var pos = getPosFromCellAddr($(this).attr('id'));
        var index = pos[0] + pos[1]* size;
        console.log(pos, env.rewardArry[index]);
    })
}

function drawWeights() {
    for (var y = 0; y < size; y++) {
        for (var x = 0; x < size; x++) {

            var r = 255,
                g = 255,
                b = 255;
            var cell = env.xyToS(x, y);

            // get value of cell under agent policy
            if (typeof agent.V !== 'undefined')
                var vv = agent.V[cell];

            else if (typeof agent.Q !== 'undefined') {
                var possibleStates = env.allowedActions(cell),
                    vv = -1;

                for (var i = 0, n = possibleStates.length; i < n; i++) {
                    var qsa = agent.Q[possibleStates[i] * size + cell];

                    if (i === 0 || qsa > vv) vv = qsa;
                }
            }


            var ms = 100;
            if (vv > 0) {
                g = 255;
                r = 255 - vv * ms;
                b = 255 - vv * ms;
            }
            if (vv < 0) {
                g = 255 + vv * ms;
                r = 255;
                b = 255 + vv * ms;
            }
            var vcol = 'rgb(' + Math.floor(r) + ',' + Math.floor(g) + ',' + Math.floor(b) + ')';
            if (env.t && env.T[cell] === 1) vcol = "#AAA";

            var id = `#${x}-${y}`;
            $(id).css({
                background: vcol
            })
        }
    }
}

writeOnConsole("Maze Puzzle (c) Nauman Umer");
writeOnConsole("Info: Use Arrow keys to move Player", "rgb(97, 175, 255)");

$("#size").change(() => {
    size = parseInt($("#size option:selected").val());
    var dims = {
        10: 25,
        15: 20,
        20: 20,
        30: 15,
        40: 10,
        50: 10
    }
    TileSize = dims[size];
    initGame();
})