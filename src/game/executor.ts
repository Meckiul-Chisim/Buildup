import type { ActionLogEntry, ChallengeSpec, Level } from "@/types";
import { buildRobotApi, type RobotState } from "./robotApi";

const MAX_API_CALLS = 500;
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as new (
  ...args: string[]
) => (...values: unknown[]) => Promise<unknown>;

export type ExecutionResult = {
  actions: ActionLogEntry[];
  output: string[];
  error: string | null;
  won: boolean;
  failureReason: string | null;
};

function validateChallenge(spec: ChallengeSpec, code: string, output: string[]): string | null {
  const source = code.toLowerCase();

  for (const token of spec.requiredTokens ?? []) {
    if (!source.includes(token.toLowerCase())) {
      return `Your solution should use ${token} for this challenge.`;
    }
  }

  if ((spec.minOutputLines ?? 0) > output.length) {
    return `Your program should produce at least ${spec.minOutputLines} output line(s).`;
  }

  if (spec.expectedOutput?.length) {
    const actual = output.map((line) => line.trim());
    const expected = spec.expectedOutput.map((line) => line.trim());

    if (actual.join("\n") !== expected.join("\n")) {
      return `The output is not quite right. Expected: ${expected.join(" | ")}`;
    }
  }

  return null;
}

export async function executeLevel(level: Level, code: string): Promise<ExecutionResult> {
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
    log: (...values: unknown[]) => output.push(values.map((value) => {
      if (Array.isArray(value)) return value.join(",");
      if (value && typeof value === "object") {
        return JSON.stringify(value);
      }
      return String(value);
    }).join(" ")),
  };

  const robot = buildRobotApi(level, state, () => {
    apiCalls += 1;
    if (apiCalls > MAX_API_CALLS) throw new Error("Program stopped after 500 robot calls. Possible infinite loop.");
  });

  try {
    if (level.challenge && level.challenge.kind !== "robot") {
      const program = new AsyncFunction("console", "fetch", "robot", `"use strict";\n${code}`);
      await program(capturedConsole, fetch, robot);
    } else {
      const program = new Function("robot", "console", `"use strict";\n${code}`);
      program(robot, capturedConsole);
    }
  } catch (caughtError) {
    error = caughtError instanceof Error ? caughtError.message : "The program stopped unexpectedly.";
    state.actions.push({ type: "error", message: error });
  }

  if (level.challenge && level.challenge.kind !== "robot") {
    const validationFailure = error ?? validateChallenge(level.challenge, code, output);
    return {
      actions: state.actions,
      output,
      error,
      won: !validationFailure,
      failureReason: validationFailure,
    };
  }

  const goalZ = level.grid.findIndex((row) => row.includes("goal"));
  const goalX = goalZ >= 0 ? level.grid[goalZ].findIndex((tile) => tile === "goal") : -1;
  const won = !error && !state.failed && state.position.x === goalX && state.position.z === goalZ;
  const failureReason = error ?? (state.actions.some((action) => action.type === "hitWall")
    ? "Your robot hit a wall."
    : !won ? "Your robot did not reach the goal." : null);

  return { actions: state.actions, output, error, won, failureReason };
}