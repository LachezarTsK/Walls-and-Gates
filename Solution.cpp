
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Point {
        int row;
        int column;
	Point(int row, int column) : row {row}, column {column}{}
    };

    inline static const int WALL = -1;
    inline static const int GATE = 0;
    inline static const int EMPTY = INT_MAX;
    inline static const array<array<int, 2>, 4> moves{ {{-1, 0}, {1, 0}, {0, -1}, {0, 1}} };
    size_t rows{};
    size_t columns{};

public:
    void wallsAndGates(vector<vector<int>>& rooms) {
        rows = rooms.size();
        columns = rooms[0].size();
        findDistanceFromEachEmptyPointToNearestGate(rooms);
    }

private:
    void findDistanceFromEachEmptyPointToNearestGate(vector<vector<int>>& rooms) {
        queue<Point> queue;
        initializeQueue(rooms, queue);

        while (!queue.empty()) {

            Point current = queue.front();
            queue.pop();
            for (const auto& move : moves) {
                int nextRow = current.row + move[0];
                int nextColumn = current.column + move[1];

                if (isInMatrix(nextRow, nextColumn) && rooms[nextRow][nextColumn] == EMPTY) {
                    rooms[nextRow][nextColumn] = rooms[current.row][current.column] + 1;
                    queue.emplace(Point(nextRow, nextColumn));
                }
            }
        }
    }

    void initializeQueue(const vector<vector<int>>& rooms, queue<Point>& queue) {
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                if (rooms[r][c] == GATE) {
                    queue.emplace(Point(r, c));
                }
            }
        }
    }

    bool isInMatrix(int row, int column) {
        return row < rows && row >= 0 && column < columns && column >= 0;
    }
};
