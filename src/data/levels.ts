import type { Level } from "@/types";

export const levels: Level[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "Guide the robot straight to the beacon.",
    grid: [
      ["wall", "start", "wall"],
      ["wall", "floor", "wall"],
      ["wall", "floor", "wall"],
      ["wall", "goal", "wall"],
    ],
    startPosition: { x: 1, z: 0 },
    startDirection: 0,
    starterCode: "robot.moveForward();\nrobot.moveForward();\nrobot.moveForward();",
  },
  {
    id: "corner-office",
    name: "Corner Office",
    description: "Turn the corner, then take the long way to the goal.",
    grid: [
      ["wall", "start", "wall", "wall", "wall"],
      ["wall", "floor", "wall", "wall", "wall"],
      ["wall", "floor", "floor", "floor", "wall"],
      ["wall", "wall", "wall", "floor", "wall"],
      ["wall", "wall", "wall", "goal", "wall"],
    ],
    startPosition: { x: 1, z: 0 },
    startDirection: 0,
    starterCode: "robot.moveForward();\nrobot.moveForward();\nrobot.turnRight();\nrobot.moveForward();\nrobot.moveForward();\nrobot.turnLeft();\nrobot.moveForward();\nrobot.moveForward();",
  },
  {
    id: "loop-de-loop",
    name: "Loop-de-loop",
    description: "A long corridor is your first chance to make repetition do the work.",
    grid: [
      ["wall", "start", "wall"],
      ["wall", "floor", "wall"],
      ["wall", "floor", "wall"],
      ["wall", "floor", "wall"],
      ["wall", "floor", "wall"],
      ["wall", "floor", "wall"],
      ["wall", "floor", "wall"],
      ["wall", "floor", "wall"],
      ["wall", "goal", "wall"],
    ],
    startPosition: { x: 1, z: 0 },
    startDirection: 0,
    starterCode: "for (let step = 0; step < 8; step += 1) {\n  robot.moveForward();\n}",
  },
  {
    id: "feel-the-way",
    name: "Feel the Way",
    description: "The route hides a turn. Let the robot sense the wall instead of guessing.",
    grid: [
      ["wall", "start", "wall", "wall", "wall"],
      ["wall", "floor", "wall", "wall", "wall"],
      ["wall", "floor", "floor", "goal", "wall"],
      ["wall", "wall", "wall", "wall", "wall"],
    ],
    startPosition: { x: 1, z: 0 },
    startDirection: 0,
    starterCode: "while (!robot.atGoal()) {\n  if (robot.isWallAhead()) {\n    robot.turnRight();\n  } else {\n    robot.moveForward();\n  }\n}",
  },
];

export function getLevel(id: string) {
  return levels.find((level) => level.id === id);
}