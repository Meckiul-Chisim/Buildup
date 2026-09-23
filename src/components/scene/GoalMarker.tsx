import type { Level } from "@/types";
import { gridPosition } from "./GridFloor";

export function GoalMarker({ level }: { level: Level }) {
  const z = level.grid.findIndex((row) => row.includes("goal"));
  const x = z >= 0 ? level.grid[z].findIndex((tile) => tile === "goal") : -1;
  if (x < 0 || z < 0) {
    return null;
  }
  const [px, , pz] = gridPosition(level, x, z);
  return (
    <mesh position={[px, 0.2, pz]} rotation={[-Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.25, 0.06, 12, 24]} />
      <meshStandardMaterial color="#ffe18b" emissive="#9c6e13" emissiveIntensity={1.4} />
    </mesh>
  );
}