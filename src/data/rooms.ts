import { Room, RoomObjectPosition } from "../types";

// Mock room/world data — drives the room selector and the Rooms screen.
export const rooms: Room[] = [
  {
    id: "bedroom",
    name: "Bedroom",
    unlockLevel: 1,
    status: "current",
    objects: ["bed", "desk", "laptop", "gaming-chair", "plant", "lamp"],
  },
  {
    id: "office",
    name: "Office",
    unlockLevel: 10,
    status: "locked",
    objects: ["desk", "bookshelf", "laptop", "plant"],
  },
  {
    id: "gaming-room",
    name: "Gaming Room",
    unlockLevel: 15,
    status: "locked",
    objects: ["gaming-console", "sofa", "gaming-chair"],
  },
  {
    id: "garden",
    name: "Garden",
    unlockLevel: 20,
    status: "locked",
    objects: ["plant", "bench"],
  },
  {
    id: "apartment",
    name: "Apartment",
    unlockLevel: 30,
    status: "locked",
    objects: ["sofa", "bookshelf", "coffee-machine", "desk"],
  },
];

// Placeholder layout for room objects rendered on the Home screen.
// x/y are fractions (0–1) so the layout adapts to any device size.
export const roomObjects: RoomObjectPosition[] = [
  { id: "bed", name: "Bed", x: 0.1, y: 0.55 },
  { id: "desk", name: "Desk", x: 0.55, y: 0.6 },
  { id: "laptop", name: "Laptop", x: 0.58, y: 0.5 },
  { id: "gaming-chair", name: "Gaming Chair", x: 0.35, y: 0.62 },
  { id: "sofa", name: "Sofa", x: 0.15, y: 0.35 },
  { id: "plant", name: "Plant", x: 0.85, y: 0.3 },
  { id: "bookshelf", name: "Bookshelf", x: 0.05, y: 0.2 },
  { id: "lamp", name: "Lamp", x: 0.8, y: 0.58 },
];