import { Mission } from "../types";

// Mock daily missions data.
export const missions: Mission[] = [
  { id: "m1", title: "Use your computer", xp: 30, coins: 50, completed: true },
  { id: "m2", title: "Water your plant", xp: 20, coins: 30, completed: true },
  { id: "m3", title: "Complete one challenge", xp: 50, coins: 100, completed: true },
  { id: "m4", title: "Buy an item", xp: 20, coins: 50, completed: false },
];

export const dailyReward = { xp: 100, coins: 250 };