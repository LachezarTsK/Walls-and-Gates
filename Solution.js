
/**
 * @param {number[][]} rooms
 * @return {void} 
 */
var wallsAndGates = function (rooms) {
    this.WALL = -1;
    this.GATE = 0;
    this.EMPTY = Math.pow(2, 31) - 1;
    this.moves = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    this.rows = rooms.length;
    this.columns = rooms[0].length;
    findDistanceFromEachEmptyPointToNearestGate(rooms);
};

/**
 * @param {number} row
 * @param {number} column
 */
function Point(row, column) {
    this.row = row;
    this.column = column;
}

/**
 * @param {number[][]} rooms
 * @return {void} 
 */
function findDistanceFromEachEmptyPointToNearestGate(rooms) {
    const queue = new Queue();//Queue<Point>
    initializeQueue(rooms, queue);

    while (!queue.isEmpty()) {

        const current = queue.dequeue();
        for (let move of this.moves) {
            const nextRow = current.row + move[0];
            const nextColumn = current.column + move[1];

            if (isInMatrix(nextRow, nextColumn) && rooms[nextRow][nextColumn] === this.EMPTY) {
                rooms[nextRow][nextColumn] = rooms[current.row][current.column] + 1;
                queue.enqueue(new Point(nextRow, nextColumn));
            }
        }
    }
}

/**
 * @param {number[][]} rooms
 * @param {Queue<Point>} queue
 * @return {void} 
 */
function initializeQueue(rooms, queue) {
    for (let r = 0; r < this.rows; ++r) {
        for (let c = 0; c < this.columns; ++c) {
            if (rooms[r][c] === this.GATE) {
                queue.enqueue(new Point(r, c));
            }
        }
    }
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean} 
 */
function isInMatrix(row, column) {
    return row < this.rows && row >= 0 && column < this.columns && column >= 0;
}
