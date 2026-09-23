import { createContext, useContext, useMemo, useReducer, type PropsWithChildren } from "react";

import { seedItems } from "@/data/items";
import { seedMissions } from "@/data/missions";
import { seedRooms } from "@/data/rooms";
import { seedUser } from "@/data/user";
import type { GameState, Reward } from "@/types";

type Action =
  | { type: "BUY_ITEM"; itemId: string }
  | { type: "UPGRADE_ITEM"; itemId: string }
  | { type: "COMPLETE_ACTIVITY"; itemId: string; xp: number; coins: number }
  | { type: "COMPLETE_MISSION"; missionId: string }
  | { type: "CLAIM_DAILY_REWARD" }
  | { type: "CLAIM_RANDOM_REWARD" }
  | { type: "SET_ROOM"; roomId: string }
  | { type: "COMPLETE_LEVEL"; levelId: string };

const randomRewards: Omit<Reward, "id">[] = [
  { kind: "coins", label: "Coin pouch", amount: 40, description: "A stash of bonus coins." },
  { kind: "gems", label: "Crystal shard", amount: 2, description: "A rare glowing gem." },
  { kind: "xp", label: "Focus burst", amount: 35, description: "A quick burst of XP." },
];

function createRandomReward(): Reward {
  const reward = randomRewards[Math.floor(Math.random() * randomRewards.length)];
  return { ...reward, id: `${Date.now()}-${Math.random()}` };
}

const initialState: GameState = {
  user: seedUser,
  items: seedItems,
  rooms: seedRooms,
  missions: seedMissions,
  dailyRewardClaimed: false,
  pendingReward: null,
  completedLevelIds: [],
};

function addXp(state: GameState, amount: number): GameState {
  let xp = state.user.xp + amount;
  let level = state.user.level;
  let xpToNextLevel = state.user.xpToNextLevel;
  while (xp >= xpToNextLevel) {
    xp -= xpToNextLevel;
    level += 1;
    xpToNextLevel = Math.round(xpToNextLevel * 1.25);
  }
  return { ...state, user: { ...state.user, xp, level, xpToNextLevel } };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "BUY_ITEM": {
      const item = state.items.find((entry) => entry.id === action.itemId);
      if (!item || item.owned || state.user[item.currency] < item.price) return state;
      return {
        ...state,
        user: { ...state.user, [item.currency]: state.user[item.currency] - item.price },
        items: state.items.map((entry) => entry.id === item.id ? { ...entry, owned: true, quantity: 1, level: 1 } : entry),
      };
    }
    case "UPGRADE_ITEM": {
      const item = state.items.find((entry) => entry.id === action.itemId);
      if (!item || !item.owned || state.user.coins < item.upgradeCost) return state;
      return {
        ...state,
        user: { ...state.user, coins: state.user.coins - item.upgradeCost },
        items: state.items.map((entry) => entry.id === item.id ? {
          ...entry,
          level: entry.level + 1,
          xpPerHour: entry.nextLevelXpPerHour,
          nextLevelXpPerHour: Math.round(entry.nextLevelXpPerHour * 1.35),
          upgradeCost: Math.round(entry.upgradeCost * 1.4),
        } : entry),
      };
    }
    case "COMPLETE_ACTIVITY": {
      const withXp = addXp(state, action.xp);
      return { ...withXp, user: { ...withXp.user, coins: withXp.user.coins + action.coins } };
    }
    case "COMPLETE_MISSION": {
      const mission = state.missions.find((entry) => entry.id === action.missionId);
      if (!mission || mission.completed) return state;
      const withXp = addXp(state, mission.xp);
      return {
        ...withXp,
        user: { ...withXp.user, coins: withXp.user.coins + mission.coins },
        missions: withXp.missions.map((entry) => entry.id === mission.id ? { ...entry, completed: true } : entry),
        pendingReward: createRandomReward(),
      };
    }
    case "CLAIM_DAILY_REWARD":
      if (state.dailyRewardClaimed || state.missions.some((mission) => !mission.completed)) return state;
      return { ...state, dailyRewardClaimed: true, user: { ...state.user, coins: state.user.coins + 150, gems: state.user.gems + 2 } };
    case "CLAIM_RANDOM_REWARD": {
      if (!state.pendingReward) return state;
      const reward = state.pendingReward;
      let nextState: GameState = { ...state, pendingReward: null };

      if (reward.kind === "coins") {
        nextState = { ...nextState, user: { ...nextState.user, coins: nextState.user.coins + reward.amount } };
      }

      if (reward.kind === "gems") {
        nextState = { ...nextState, user: { ...nextState.user, gems: nextState.user.gems + reward.amount } };
      }

      if (reward.kind === "xp") {
        nextState = addXp(nextState, reward.amount);
      }

      return nextState;
    }
    case "SET_ROOM":
      return { ...state, user: { ...state.user, currentRoom: action.roomId } };
    case "COMPLETE_LEVEL":
      return state.completedLevelIds.includes(action.levelId)
        ? state
        : { ...state, completedLevelIds: [...state.completedLevelIds, action.levelId] };
  }
}

const GameContext = createContext<{ state: GameState; dispatch: React.Dispatch<Action> } | null>(null);

export function GameProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used inside GameProvider");
  return context;
}