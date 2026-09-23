import type { Level } from "@/types";

type Props = { level: Level };

export function gridPosition(level: Level, x: number, z: number): [number, number, number] {
  const width = level.grid[0]?.length ?? 1;
  const depth = level.grid.length;
  return [x - (width - 1) / 2, 0, z - (depth - 1) / 2];
}

export function GridFloor({ level }: Props) {
  return (
    <group>
      {level.grid.flatMap((row, z) =>
        row.map((tile, x) => {
          if (tile === "wall") {
            return null;
          }
          const [px, , pz] = gridPosition(level, x, z);
          const color = tile === "goal" ? "#f6c453" : tile === "start" ? "#244464" : "#162843";
          return (
            <mesh key={`${x}-${z}`} position={[px, -0.08, pz]} receiveShadow>
              <boxGeometry args={[0.94, 0.16, 0.94]} />
              <meshStandardMaterial color={color} roughness={0.82} />
            </mesh>
          );
        }),
      )}
    </group>
  );
}