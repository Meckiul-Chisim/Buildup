export type Currency = "coins" | "gems";
export type ItemCategory = "Furniture" | "Tech" | "Plants" | "Decoration";
export type Rarity = "Common" | "Rare" | "Epic" | "Legendary";

export type Activity = {
  type: "coding" | "focus" | "relax";
  label: string;
};

export type Item = {
  id: string;
  name: string;
  category: ItemCategory;
  rarity: Rarity;
  price: number;
  currency: Currency;
  description: string;
  xpPerHour: number;
  nextLevelXpPerHour: number;
  upgradeCost: number;
  unlocks: string | null;
  activity: Activity | null;
  owned: boolean;
  quantity: number;
  level: number;
};

export type Room = {
  id: string;
  name: string;
  unlockLevel: number;
  status: "unlocked" | "locked";
  objects: string[];
};

export type Mission = {
  id: string;
  title: string;
  xp: number;
  coins: number;
  completed: boolean;
};

export type UserProfile = {
  username: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  gems: number;
  currentRoom: string;
  achievements: string[];
};

export type Reward = {
  id: string;
  kind: "coins" | "gems" | "xp";
  label: string;
  amount: number;
  description: string;
};

export type GameState = {
  user: UserProfile;
  items: Item[];
  rooms: Room[];
  missions: Mission[];
  dailyRewardClaimed: boolean;
  pendingReward: Reward | null;
  completedLevelIds: string[];
};

export type TileType = "floor" | "wall" | "goal" | "start";
export type Direction = 0 | 90 | 180 | 270;

export type Position = {
  x: number;
  z: number;
};

export type ChallengeKind = "robot" | "console" | "logic" | "loop" | "function" | "data" | "web" | "async" | "api" | "project";

export type ChallengeSpec = {
  kind: Exclude<ChallengeKind, "robot">;
  chapter: string;
  lesson: string;
  objective: string;
  teachingSummary: string;
  requiredTokens?: string[];
  expectedOutput?: string[];
  minOutputLines?: number;
};

export type Level = {
  id: string;
  name: string;
  description: string;
  grid: TileType[][];
  startPosition: Position;
  startDirection: Direction;
  starterCode: string;
  challenge?: ChallengeSpec;
};

export type ActionLogEntry = {
  type: "move" | "turn" | "hitWall" | "error";
  success?: boolean;
  x?: number;
  z?: number;
  direction?: Direction;
  message?: string;
};