var GameWorld = function () {
    this.rewardArry = null;
    this.reset();
}

GameWorld.prototype = {
    reset: function () {

        this.gameStates = size * size;

        var rewardArry = R.zeros(this.gameStates);

        rewardArry[rewardArry.length - 1] = 3; // ending title
        rewardArry[0] = -0.1; // start tile

        rewardArry[size-1] = -0.1; // top right tile
        rewardArry[rewardArry.length -size] = -0.1; // bottom left


        this.rewardArry = rewardArry;
    },

    reward: function (cell, action, nextState) {
        return this.rewardArry[cell];
    },
    nextStateDistribution: function (cell, action) {
        var dir = '';
        if (cell === (size * size) - 1) {
            // agent solved the puzzle
            // nextState = startState

            var nextState = this.startState();
        } else {
            // ordinary space
            var temp = cell;

            switch (action) {
                case 0: // left
                    temp -= size;
                    dir = 'l';
                    break;

                case 1: // Up
                    temp--;
                    dir = 't';
                    break;

                case 2: // Down
                    temp++;
                    dir = 'b';
                    break;

                case 3: // Right
                    temp += size;
                    dir = 'r';
                    break;
            }
            move(dir);
            var nextState = temp;
        }
        return [nextState, dir];
    },
    sampleNextState: function (cell, action) {
        var nextState = this.nextStateDistribution(cell, action);
        var reward = this.rewardArry[cell];

        reward -= 0.01; // every step takes a bit of negative reward

        var out = {
            'ns': nextState[0],
            'r': reward
        };
        if (cell === (size * size) - 1 && nextState[0] === 0) {
            // episode is over
            out.reset_episode = true;
        }
        return out;
    },
    allowedActions: function (cell) {
        var x = this.sToX(cell);
        var y = this.sToY(cell);
        var id = `#${x}-${y}`;
        var allowedDirs = getPossibleDirs(id);
        return dirsToActions(allowedDirs);
    },
    startState: function () {
        return 0;
    },
    getNumStates: function () {
        return size * size;
    },
    getMaxNumActions: function () {
        return 4;
    },

    // private functions
    sToX: function (s) {
        return Math.floor(s / size);
    },
    sToY: function (s) {
        return s % size;
    },
    xyToS: function (x, y) {
        return x * size + y;
    },
}