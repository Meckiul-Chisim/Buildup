import type { ActionLogEntry, Direction, Level, Position } from "@/types";
import { useFrame } from "@react-three/fiber/native";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import { gridPosition } from "./GridFloor";

type Props = {
  level: Level;
  actions: ActionLogEntry[];
  runKey: number;
  playing: boolean;
  onFinished: () => void;
};

const STEP_DURATION = 380;

function positionBefore(actions: ActionLogEntry[], index: number, start: Position): Position {
  let position = start;
  for (let i = 0; i < index; i += 1) {
    const action = actions[i];
    if (action.type === "move" && action.x !== undefined && action.z !== undefined) {
      position = { x: action.x, z: action.z };
    }
  }
  return position;
}

function directionBefore(actions: ActionLogEntry[], index: number, start: Direction): Direction {
  let direction = start;
  for (let i = 0; i < index; i += 1) {
    const action = actions[i];
    if (action.type === "turn" && action.direction !== undefined) {
      direction = action.direction;
    }
  }
  return direction;
}

export function Robot({ level, actions, runKey, playing, onFinished }: Props) {
  const robot = useRef<Group>(null);
  const startTime = useRef(0);
  const finishedRun = useRef(runKey);

  useEffect(() => {
    startTime.current = 0;
    finishedRun.current = runKey - 1;
  }, [runKey]);

  useFrame((renderState) => {
    if (!robot.current) {
      return;
    }
    if (!playing) {
      const [x, y, z] = gridPosition(level, level.startPosition.x, level.startPosition.z);
      robot.current.position.set(x, y + 0.48, z);
      robot.current.rotation.y = (level.startDirection * Math.PI) / 180;
      return;
    }
    if (!startTime.current) {
      startTime.current = renderState.clock.elapsedTime * 1000;
    }

    const elapsed = renderState.clock.elapsedTime * 1000 - startTime.current;
    const stepIndex = Math.floor(elapsed / STEP_DURATION);
    const progress = (elapsed % STEP_DURATION) / STEP_DURATION;
    if (stepIndex >= actions.length) {
      if (finishedRun.current !== runKey) {
        finishedRun.current = runKey;
        onFinished();
      }
      return;
    }

    const action = actions[stepIndex];
    const from = positionBefore(actions, stepIndex, level.startPosition);
    const to = action.type === "move" && action.x !== undefined && action.z !== undefined
      ? { x: action.x, z: action.z }
      : from;
    const eased = progress * progress * (3 - 2 * progress);
    const x = from.x + (to.x - from.x) * eased;
    const z = from.z + (to.z - from.z) * eased;
    const [px, py, pz] = gridPosition(level, x, z);
    robot.current.position.set(px, py + 0.48, pz);
    const direction = action.type === "turn" && action.direction !== undefined
      ? action.direction
      : directionBefore(actions, stepIndex, level.startDirection);
    robot.current.rotation.y = (direction * Math.PI) / 180;
  });

  return (
    <group ref={robot}>
      <mesh castShadow>
        <boxGeometry args={[0.46, 0.48, 0.42]} />
        <meshStandardMaterial color="#42e8c2" metalness={0.25} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.32, 0]} castShadow>
        <boxGeometry args={[0.36, 0.2, 0.36]} />
        <meshStandardMaterial color="#d9fff6" metalness={0.12} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.34, -0.19]}>
        <boxGeometry args={[0.12, 0.07, 0.02]} />
        <meshStandardMaterial color="#10233b" emissive="#42e8c2" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}