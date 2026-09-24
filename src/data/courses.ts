import type { Level } from "@/types";

export type ChallengeKind = "maze" | "browser" | "terminal" | "debug";

export type Challenge = {
  id: string;
  title: string;
  kind: ChallengeKind;
  lesson: string;
  objective: string;
  levelId?: string;
  starterCode: string;
  expected: string[];
  reward: number;
};

export type Chapter = {
  id: string;
  title: string;
  subtitle: string;
  skills: string[];
  challenges: string[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
  color: string;
  chapters: Chapter[];
};

export const challenges: Challenge[] = [
  { id: "js-hello", title: "Wake Up the Console", kind: "terminal", lesson: "Your first JavaScript program", objective: "Print a welcome message from JavaScript.", starterCode: "", expected: ["console.log"], reward: 50 },
  { id: "js-values", title: "Fix the Variables", kind: "terminal", lesson: "Variables and values", objective: "Create a variable named score and give it a number.", starterCode: "", expected: ["let score", "=",], reward: 50 },
  { id: "js-robot", title: "First Steps", kind: "maze", lesson: "Commands and sequence", objective: "Guide the robot to the beacon using JavaScript.", levelId: "first-steps", starterCode: "", expected: ["robot.moveForward"], reward: 75 },
  { id: "js-turns", title: "Corner Office", kind: "maze", lesson: "Functions and turns", objective: "Combine movement and turning commands to reach the beacon.", levelId: "corner-office", starterCode: "", expected: ["robot.moveForward", "robot.turn"], reward: 100 },

  { id: "logic-conditions", title: "The Smart Door", kind: "terminal", lesson: "if / else", objective: "Write a condition that checks whether access is allowed.", starterCode: "", expected: ["if", "else"], reward: 60 },
  { id: "logic-loop", title: "Loop the Corridor", kind: "maze", lesson: "for loops", objective: "Use repetition instead of writing the same movement over and over.", levelId: "loop-de-loop", starterCode: "", expected: ["for", "robot.moveForward"], reward: 100 },
  { id: "logic-sensors", title: "Sense the Way", kind: "maze", lesson: "while and sensors", objective: "Use the robot sensor to decide when to move.", levelId: "feel-the-way", starterCode: "", expected: ["while", "robot.isWallAhead"], reward: 125 },
  { id: "logic-patterns", title: "Zigzag Protocol", kind: "maze", lesson: "Combining logic", objective: "Solve a larger route with reusable patterns.", levelId: "zigzag-protocol", starterCode: "", expected: ["robot.moveForward"], reward: 150 },

  { id: "html-structure", title: "Build a Landing Page", kind: "browser", lesson: "HTML structure", objective: "Create a page with a heading, paragraph and button.", starterCode: "", expected: ["<h1", "<p", "<button"], reward: 75 },
  { id: "html-card", title: "Product Card", kind: "browser", lesson: "Semantic sections", objective: "Build the structure of a product card.", starterCode: "", expected: ["<article", "<h2", "<button"], reward: 90 },
  { id: "html-form", title: "Contact Form", kind: "browser", lesson: "Forms and inputs", objective: "Create a simple contact form with a name input and submit button.", starterCode: "", expected: ["<form", "<input", "type=\"submit\""], reward: 100 },
  { id: "html-nav", title: "Navigation Bar", kind: "browser", lesson: "Links and navigation", objective: "Build a navigation area with links.", starterCode: "", expected: ["<nav", "<a"], reward: 100 },

  { id: "css-colors", title: "Give It a Personality", kind: "browser", lesson: "CSS colors", objective: "Style the page with a background color and readable text.", starterCode: "", expected: ["background", "color"], reward: 75 },
  { id: "css-card", title: "Make It Look Like a Product", kind: "browser", lesson: "Spacing and cards", objective: "Turn a plain card into a polished UI block.", starterCode: "", expected: ["padding", "border-radius"], reward: 100 },
  { id: "css-layout", title: "Dashboard Layout", kind: "browser", lesson: "Flexbox", objective: "Arrange dashboard cards using flexbox.", starterCode: "", expected: ["display", "flex"], reward: 110 },
  { id: "css-responsive", title: "Phone vs Desktop", kind: "browser", lesson: "Responsive design", objective: "Add a responsive rule that changes the layout on small screens.", starterCode: "", expected: ["@media"], reward: 125 },

  { id: "dom-button", title: "Make the Button Do Something", kind: "browser", lesson: "DOM events", objective: "Add a click handler that changes the page.", starterCode: "", expected: ["addEventListener", "click"], reward: 110 },
  { id: "dom-counter", title: "Counter Machine", kind: "browser", lesson: "State with JavaScript", objective: "Make a button increase a visible counter.", starterCode: "", expected: ["addEventListener", "textContent"], reward: 125 },
  { id: "dom-todo", title: "Mini Todo App", kind: "browser", lesson: "Creating elements", objective: "Create a todo item from user input.", starterCode: "", expected: ["createElement", "append"], reward: 150 },
  { id: "debug-broken", title: "Fix the Broken Page", kind: "debug", lesson: "Debugging", objective: "Find the missing closing tag and broken JavaScript call.", starterCode: "", expected: ["</h1>", "console.log(\"hello\")"], reward: 175 },

  { id: "project-hero", title: "Project: Hero Section", kind: "browser", lesson: "Real project build", objective: "Build a hero section for a fictional startup.", starterCode: "", expected: ["<section", "<h1", "button"], reward: 150 },
  { id: "project-pricing", title: "Project: Pricing Cards", kind: "browser", lesson: "Real project build", objective: "Create a three-tier pricing section.", starterCode: "", expected: ["pricing", "display", "flex"], reward: 175 },
  { id: "project-dashboard", title: "Project: Analytics Dashboard", kind: "browser", lesson: "Real project build", objective: "Assemble a dashboard with navigation, stats and a chart placeholder.", starterCode: "", expected: ["nav", "card", "display"], reward: 200 },
  { id: "project-launch", title: "Final Project: Launch Site", kind: "browser", lesson: "Capstone", objective: "Build a responsive landing page that combines structure, styling and interaction.", starterCode: "", expected: ["<main", "display", "addEventListener", "@media"], reward: 300 },
];

export const courses: Course[] = [
  {
    id: "web-developer",
    title: "Web Developer Journey",
    description: "Go from your first JavaScript command to building a real responsive website.",
    level: "Beginner → Builder",
    color: "#34D399",
    chapters: [
      { id: "foundations", title: "01 · JavaScript Foundations", subtitle: "Think like a programmer", skills: ["Variables", "Commands", "Functions"], challenges: ["js-hello", "js-values", "js-robot", "js-turns"] },
      { id: "logic", title: "02 · Logic & Loops", subtitle: "Make code make decisions", skills: ["if / else", "for", "while", "Sensors"], challenges: ["logic-conditions", "logic-loop", "logic-sensors", "logic-patterns"] },
      { id: "html", title: "03 · Build the Web", subtitle: "Turn ideas into real pages", skills: ["HTML", "Semantic structure", "Forms", "Navigation"], challenges: ["html-structure", "html-card", "html-form", "html-nav"] },
      { id: "css", title: "04 · Make It Beautiful", subtitle: "Design interfaces with CSS", skills: ["Colors", "Spacing", "Flexbox", "Responsive CSS"], challenges: ["css-colors", "css-card", "css-layout", "css-responsive"] },
      { id: "javascript-web", title: "05 · Make It Interactive", subtitle: "Bring websites to life", skills: ["DOM", "Events", "State", "Debugging"], challenges: ["dom-button", "dom-counter", "dom-todo", "debug-broken"] },
      { id: "projects", title: "06 · Build Real Projects", subtitle: "Ship what you learned", skills: ["Landing pages", "Dashboards", "UI systems", "Capstone"], challenges: ["project-hero", "project-pricing", "project-dashboard", "project-launch"] },
    ],
  },
];

export function getCourse(id: string) {
  return courses.find((course) => course.id === id);
}

export function getChallenge(id: string) {
  return challenges.find((challenge) => challenge.id === id);
}
