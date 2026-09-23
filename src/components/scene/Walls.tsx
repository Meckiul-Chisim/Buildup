import type { Level } from "@/types";
import { gridPosition } from "./GridFloor";

export function Walls({ level }: { level: Level }) {
  return (
    <group>
      {level.grid.flatMap((row, z) =>
        row.map((tile, x) => {
          if (tile !== "wall") {
            return null;
          }
          const [px, , pz] = gridPosition(level, x, z);
          return (
            <mesh key={`${x}-${z}`} position={[px, 0.5, pz]} castShadow>
              <boxGeometry args={[0.94, 1, 0.94]} />
              <meshStandardMaterial color="#314766" roughness={0.62} />
            </mesh>
          );
        }),
      )}
    </group>
  );
}