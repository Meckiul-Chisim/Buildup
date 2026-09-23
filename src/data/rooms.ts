import type { Room } from "@/types";

export const seedRooms: Room[] = [
  { id: "studio", name: "The Studio", unlockLevel: 1, status: "unlocked", objects: ["focus-desk"] },
  { id: "rooftop", name: "Rooftop Garden", unlockLevel: 3, status: "locked", objects: [] },
  { id: "arcade", name: "The Arcade", unlockLevel: 6, status: "locked", objects: [] },
];