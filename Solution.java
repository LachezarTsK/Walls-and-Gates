
import java.util.LinkedList;
import java.util.Queue;

public class Solution {

    private static final int WALL = -1;
    private static final int GATE = 0;
    private static final int EMPTY = Integer.MAX_VALUE;
    private static final int[][] moves = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    private record Point(int row, int column) {}
    private int rows;
    private int columns;

    public void wallsAndGates(int[][] rooms) {
        rows = rooms.length;
        columns = rooms[0].length;
        findDistanceFromEmptyPointToNearestGate(rooms);
    }

    private void findDistanceFromEmptyPointToNearestGate(int[][] rooms) {
        Queue<Point> queue = new LinkedList<>();
        initializeQueue(rooms, queue);

        while (!queue.isEmpty()) {

            Point current = queue.poll();
            for (int[] move : moves) {
                int nextRow = current.row + move[0];
                int nextColumn = current.column + move[1];

                if (isInMatrix(nextRow, nextColumn) && rooms[nextRow][nextColumn] == EMPTY) {
                    rooms[nextRow][nextColumn] = rooms[current.row][current.column] + 1;
                    queue.add(new Point(nextRow, nextColumn));
                }
            }
        }
    }

    private void initializeQueue(int[][] rooms, Queue<Point> queue) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                if (rooms[r][c] == GATE) {
                    queue.add(new Point(r, c));
                }
            }
        }
    }

    private boolean isInMatrix(int row, int column) {
        return row < rows && row >= 0 && column < columns && column >= 0;
    }
}
