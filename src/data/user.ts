import { UserProfile } from "../types";

// Mock user/profile data. Later this comes from a backend + auth,
// but for this prototype stage we keep everything local and static.
export const user: UserProfile = {
  username: "Meckiul",
  avatar: null,
  level: 8,
  xp: 320,
  xpToNextLevel: 800,
  coins: 1240,
  gems: 38,
  currentRoom: "bedroom",
  achievements: [
    { id: "a1", title: "First Buy", unlocked: true },
    { id: "a2", title: "Daily Streak", unlocked: true },
    { id: "a3", title: "Explorer", unlocked: false },
    { id: "a4", title: "Level 10", unlocked: false },
  ],
};