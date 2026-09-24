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
    starterCode: "",
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
    starterCode: "",
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
    starterCode: "",
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
    starterCode: "",
  },
];

export function getLevel(id: string) {
  return levels.find((level) => level.id === id);
}
