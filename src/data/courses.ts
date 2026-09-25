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
  learn: string;
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
  { id: "jsx-component", title: "Your First JSX Component", kind: "browser", lesson: "JSX and components", objective: "Write a React component that returns a heading and paragraph.", starterCode: "", expected: ["function", "return", "<h1", "<p"], reward: 150 },
  { id: "jsx-props", title: "Pass Data with Props", kind: "browser", lesson: "JSX props", objective: "Create a reusable component that receives and displays a prop.", starterCode: "", expected: ["props", "return"], reward: 175 },
  { id: "jsx-conditions", title: "Conditional UI", kind: "browser", lesson: "Conditional rendering", objective: "Render different JSX based on a condition.", starterCode: "", expected: ["?", ":"], reward: 175 },
  { id: "jsx-list", title: "Render a List", kind: "browser", lesson: "JSX lists and map", objective: "Use map() to turn an array into a list of JSX elements.", starterCode: "", expected: [".map", "return", "<li"], reward: 200 },
];

export const courses: Course[] = [
  {
    id: "web-developer",
    title: "Web Developer Journey",
    description: "Go from JavaScript fundamentals to JSX, React components, and real responsive web projects.",
    level: "Beginner → Builder",
    color: "#34D399",
    chapters: [
      { id: "foundations", title: "01 · JavaScript Foundations", subtitle: "Think like a programmer", skills: ["Variables", "Commands", "Functions"], learn: "Learn how code runs from top to bottom, how values are stored, and how functions become reusable instructions.", challenges: ["js-hello", "js-values", "js-robot", "js-turns"] },
      { id: "logic", title: "02 · Logic & Loops", subtitle: "Make code make decisions", skills: ["if / else", "for", "while", "Sensors"], learn: "Teach your programs to repeat work and react to conditions instead of following one fixed path.", challenges: ["logic-conditions", "logic-loop", "logic-sensors", "logic-patterns"] },
      { id: "html", title: "03 · Build the Web", subtitle: "Turn ideas into real pages", skills: ["HTML", "Semantic structure", "Forms", "Navigation"], learn: "Move from robot commands to real web structure by building headings, cards, forms and navigation.", challenges: ["html-structure", "html-card", "html-form", "html-nav"] },
      { id: "css", title: "04 · Make It Beautiful", subtitle: "Design interfaces with CSS", skills: ["Colors", "Spacing", "Flexbox", "Responsive CSS"], learn: "Control the visual system of a page: color, spacing, layout and responsive behavior.", challenges: ["css-colors", "css-card", "css-layout", "css-responsive"] },
      { id: "javascript-web", title: "05 · Make It Interactive", subtitle: "Bring websites to life", skills: ["DOM", "Events", "State", "Debugging"], learn: "Use JavaScript in the browser to listen for actions, update the page and debug broken behavior.", challenges: ["dom-button", "dom-counter", "dom-todo", "debug-broken"] },
      { id: "projects", title: "06 · Build Real Projects", subtitle: "Ship what you learned", skills: ["Landing pages", "Dashboards", "UI systems", "Capstone"], learn: "Combine everything into realistic product screens, then finish with a responsive launch website.", challenges: ["project-hero", "project-pricing", "project-dashboard", "project-launch"] },
      { id: "jsx", title: "07 · JSX & React Foundations", subtitle: "Turn JavaScript into interfaces", skills: ["JSX", "Components", "Props", "Conditional UI", "map()"], learn: "Learn how JSX works inside JavaScript, build reusable components, pass data with props, render conditions, and turn arrays into UI.", challenges: ["jsx-component", "jsx-props", "jsx-conditions", "jsx-list"] },
    ],
  },
  {
    id: "react-app-builder",
    title: "React App Builder",
    description: "Move from JSX basics to building complete React applications with state, forms, routing, data, and reusable architecture.",
    level: "Builder → Developer",
    color: "#60A5FA",
    chapters: [
      { id: "react-components", title: "01 · React Components", subtitle: "Build reusable UI", skills: ["Components", "Props", "Composition"], learn: "Learn how React breaks an interface into small reusable components and how props move data from one component to another.", challenges: [] },
      { id: "react-state", title: "02 · State & Events", subtitle: "Make interfaces respond", skills: ["useState", "Events", "State flow"], learn: "Understand state as changing information, how events trigger updates, and why React re-renders the interface when state changes.", challenges: [] },
      { id: "react-forms", title: "03 · Forms & Validation", subtitle: "Handle user input", skills: ["Forms", "Controlled inputs", "Validation"], learn: "Learn how form data moves into state, how validation works, and how a form becomes a reliable part of an application.", challenges: [] },
      { id: "react-effects", title: "04 · Effects & Data", subtitle: "Work with external data", skills: ["useEffect", "fetch", "Loading", "Errors"], learn: "Understand when code should run because something changed, how to request data, and how applications handle loading and errors.", challenges: [] },
      { id: "react-routing", title: "05 · Routing & App Structure", subtitle: "Build multi-page experiences", skills: ["Routes", "Navigation", "Layouts"], learn: "Learn how applications organize screens, navigate between them, and keep shared layouts and UI consistent.", challenges: [] },
      { id: "react-project", title: "06 · Complete React App", subtitle: "Put everything together", skills: ["Architecture", "Reusable UI", "Data", "Deployment"], learn: "Combine components, state, forms, routing and data into a complete application that is organized like a real developer project.", challenges: [] },
    ],
  },
];

export function getCourse(id: string) {
  return courses.find((course) => course.id === id);
}

export function getChallenge(id: string) {
  return challenges.find((challenge) => challenge.id === id);
}
