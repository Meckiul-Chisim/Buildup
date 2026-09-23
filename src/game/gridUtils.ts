import type { Direction, Level, Position, TileType } from "@/types";

export function directionVector(direction: Direction): Position {
  switch (direction) {
    case 90:
      return { x: 1, z: 0 };
    case 180:
      return { x: 0, z: -1 };
    case 270:
      return { x: -1, z: 0 };
    default:
      return { x: 0, z: 1 };
  }
}

export function turn(direction: Direction, amount: -1 | 1): Direction {
  return ((direction + amount * 90 + 360) % 360) as Direction;
}

export function tileAt(level: Level, position: Position): TileType | undefined {
  return level.grid[position.z]?.[position.x];
}

export function isWalkable(level: Level, position: Position) {
  const tile = tileAt(level, position);
  return tile === "floor" || tile === "start" || tile === "goal";
}

export function positionAhead(position: Position, direction: Direction): Position {
  const vector = directionVector(direction);
  return { x: position.x + vector.x, z: position.z + vector.z };
}