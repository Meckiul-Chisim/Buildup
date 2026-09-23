import type { ActionLogEntry, Level } from "@/types";
import { buildRobotApi, type RobotState } from "./robotApi";

const MAX_API_CALLS = 500;

export type ExecutionResult = {
  actions: ActionLogEntry[];
  output: string[];
  error: string | null;
  won: boolean;
  failureReason: string | null;
};

export function executeLevel(level: Level, code: string): ExecutionResult {
  const state: RobotState = {
    position: { ...level.startPosition },
    direction: level.startDirection,
    actions: [],
    failed: false,
  };
  const output: string[] = [];
  let apiCalls = 0;
  let error: string | null = null;
  const capturedConsole = {
    log: (...values: unknown[]) => output.push(values.map(String).join(" ")),
  };
  const robot = buildRobotApi(level, state, () => {
    apiCalls += 1;
    if (apiCalls > MAX_API_CALLS) {
      throw new Error("Program stopped after 500 robot calls. Possible infinite loop.");
    }
  });

  try {
    // Intentional MVP trade-off: run once in a constrained Function, then animate the log.
    // A live interpreter would be safer and more capable, but is outside this local game's scope.
    const program = new Function("robot", "console", `"use strict";\n${code}`);
    program(robot, capturedConsole);
  } catch (caughtError) {
    error = caughtError instanceof Error ? caughtError.message : "The program stopped unexpectedly.";
    state.actions.push({ type: "error", message: error });
  }

  const goalZ = level.grid.findIndex((row) => row.includes("goal"));
  const goalX = goalZ >= 0 ? level.grid[goalZ].findIndex((tile) => tile === "goal") : -1;
  const won = !error && !state.failed && state.position.x === goalX && state.position.z === goalZ;

  const failureReason = error ?? (state.actions.some((action) => action.type === "hitWall")
    ? "Your robot hit a wall."
    : state.actions.some((action) => action.type === "error")
      ? "Your code stopped with an error."
      : !won
        ? "Your robot did not reach the goal."
        : null);

  return { actions: state.actions, output, error, won, failureReason };
}