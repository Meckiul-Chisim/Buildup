import type { Mission } from "@/types";

export const seedMissions: Mission[] = [
  { id: "open-room", title: "Open your room", xp: 40, coins: 25, completed: false },
  { id: "visit-shop", title: "Visit the shop", xp: 60, coins: 35, completed: false },
  { id: "finish-sprint", title: "Finish one activity", xp: 90, coins: 50, completed: false },
];