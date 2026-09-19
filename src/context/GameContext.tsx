import {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useReducer,
} from "react";
import { items as initialItems } from "../data/items";
import { dailyReward, missions as initialMissions } from "../data/missions";
import { user as initialUser } from "../data/user";
import { Item, Mission, UserProfile } from "../types";

interface GameState {
  user: UserProfile;
  items: Item[];
  missions: Mission[];
  dailyRewardClaimed: boolean;
}

type Action =
  | { type: "BUY_ITEM"; itemId: string }
  | { type: "UPGRADE_ITEM"; itemId: string }
  | { type: "COMPLETE_ACTIVITY"; itemId: string; xp: number; coins: number }
  | { type: "COMPLETE_MISSION"; missionId: string }
  | { type: "CLAIM_DAILY_REWARD" };

const initialState: GameState = {
  user: initialUser,
  items: initialItems,
  missions: initialMissions,
  dailyRewardClaimed: false,
};

// Applies XP/coin gains to the user and rolls over levels as needed.
// Growth curve (xpToNextLevel *= 1.25 per level) is a placeholder —
// swap this for real game-economy tuning once you're balancing progression.
function addRewards(user: UserProfile, xp: number, coins: number): UserProfile {
  let { level, xp: currentXp, xpToNextLevel } = user;
  currentXp += xp;

  while (currentXp >= xpToNextLevel) {
    currentXp -= xpToNextLevel;
    level += 1;
    xpToNextLevel = Math.round(xpToNextLevel * 1.25);
  }

  return { ...user, level, xp: currentXp, xpToNextLevel, coins: user.coins + coins };
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "BUY_ITEM": {
      const item = state.items.find((i) => i.id === action.itemId);
      if (!item || item.owned) return state; // already owned, nothing to do

      const balance = item.currency === "coins" ? state.user.coins : state.user.gems;
      if (balance < item.price) return state; // can't afford — silently no-op

      return {
        ...state,
        user: {
          ...state.user,
          coins: item.currency === "coins" ? state.user.coins - item.price : state.user.coins,
          gems: item.currency === "gems" ? state.user.gems - item.price : state.user.gems,
        },
        items: state.items.map((i) =>
          i.id === action.itemId ? { ...i, owned: true, quantity: 1, level: 1 } : i
        ),
      };
    }

    case "UPGRADE_ITEM": {
      const item = state.items.find((i) => i.id === action.itemId);
      if (!item || !item.owned || state.user.coins < item.upgradeCost) return state;

      return {
        ...state,
        user: { ...state.user, coins: state.user.coins - item.upgradeCost },
        items: state.items.map((i) =>
          i.id === action.itemId
            ? {
                ...i,
                level: i.level + 1,
                xpPerHour: i.nextLevelXpPerHour,
                nextLevelXpPerHour: Math.round(i.nextLevelXpPerHour * 1.6),
                upgradeCost: Math.round(i.upgradeCost * 1.8),
              }
            : i
        ),
      };
    }

    case "COMPLETE_ACTIVITY": {
      return { ...state, user: addRewards(state.user, action.xp, action.coins) };
    }

    case "COMPLETE_MISSION": {
      const mission = state.missions.find((m) => m.id === action.missionId);
      if (!mission || mission.completed) return state;

      return {
        ...state,
        user: addRewards(state.user, mission.xp, mission.coins),
        missions: state.missions.map((m) =>
          m.id === action.missionId ? { ...m, completed: true } : m
        ),
      };
    }

    case "CLAIM_DAILY_REWARD": {
      const allCompleted = state.missions.every((m) => m.completed);
      if (!allCompleted || state.dailyRewardClaimed) return state;

      return {
        ...state,
        dailyRewardClaimed: true,
        user: addRewards(state.user, dailyReward.xp, dailyReward.coins),
      };
    }

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  buyItem: (itemId: string) => void;
  upgradeItem: (itemId: string) => void;
  completeActivity: (itemId: string, xp: number, coins: number) => void;
  completeMission: (missionId: string) => void;
  claimDailyReward: () => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      buyItem: (itemId) => dispatch({ type: "BUY_ITEM", itemId }),
      upgradeItem: (itemId) => dispatch({ type: "UPGRADE_ITEM", itemId }),
      completeActivity: (itemId, xp, coins) =>
        dispatch({ type: "COMPLETE_ACTIVITY", itemId, xp, coins }),
      completeMission: (missionId) => dispatch({ type: "COMPLETE_MISSION", missionId }),
      claimDailyReward: () => dispatch({ type: "CLAIM_DAILY_REWARD" }),
    }),
    [state]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within a GameProvider");
  return ctx;
}