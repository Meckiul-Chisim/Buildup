import type { ActionLogEntry, Direction, Level, Position } from "@/types";
import { isWalkable, positionAhead, turn } from "./gridUtils";

export interface RobotAPI {
  moveForward(): void;
  turnLeft(): void;
  turnRight(): void;
  isWallAhead(): boolean;
  atGoal(): boolean;
}

export type RobotState = {
  position: Position;
  direction: Direction;
  actions: ActionLogEntry[];
  failed: boolean;
};

export function buildRobotApi(level: Level, state: RobotState, onApiCall: () => void): RobotAPI {
  const goalZ = level.grid.findIndex((row) => row.includes("goal"));
  const goalX = goalZ >= 0 ? level.grid[goalZ].findIndex((tile) => tile === "goal") : -1;
  const api = {
    moveForward() {
      onApiCall();
      const next = positionAhead(state.position, state.direction);
      if (!isWalkable(level, next)) {
        state.failed = true;
        state.actions.push({ type: "hitWall", message: "The robot bumped into a wall." });
        return;
      }
      state.position = next;
      state.actions.push({ type: "move", success: true, x: next.x, z: next.z });
    },
    turnLeft() {
      onApiCall();
      state.direction = turn(state.direction, -1);
      state.actions.push({ type: "turn", direction: state.direction });
    },
    turnRight() {
      onApiCall();
      state.direction = turn(state.direction, 1);
      state.actions.push({ type: "turn", direction: state.direction });
    },
    isWallAhead() {
      onApiCall();
      return !isWalkable(level, positionAhead(state.position, state.direction));
    },
    atGoal() {
      onApiCall();
      return state.position.x === goalX && state.position.z === goalZ;
    },
  } satisfies RobotAPI;

  return api;
}