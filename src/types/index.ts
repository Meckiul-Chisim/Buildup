// Shared type definitions used across data, components, and screens.
export type Rarity = "Common" | "Rare" | "Epic" | "Legendary";
export type Currency = "coins" | "gems";
export type Category = "Furniture" | "Tech" | "Plants" | "Decoration";

export interface ObjectActivity {
  type: "coding" | "quiz" | "minigame" | "care" | "energy" | "rest";
  label: string;
}

export interface Item {
  id: string;
  name: string;
  category: Category;
  rarity: Rarity;
  price: number;
  currency: Currency;
  description: string;
  xpPerHour: number;
  nextLevelXpPerHour: number;
  upgradeCost: number;
  unlocks: string | null;
  activity: ObjectActivity | null;
  owned: boolean;
  quantity: number;
  level: number;
}

export interface Room {
  id: string;
  name: string;
  unlockLevel: number;
  status: "current" | "locked";
  objects: string[];
}

export interface RoomObjectPosition {
  id: string;
  name: string;
  x: number; // fraction of room width, 0–1
  y: number; // fraction of room height, 0–1
}

export interface Mission {
  id: string;
  title: string;
  xp: number;
  coins: number;
  completed: boolean;
}

export interface UserProfile {
  username: string;
  avatar: string | null;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  gems: number;
  currentRoom: string;
  achievements: { id: string; title: string; unlocked: boolean }[];
}