import type { ChallengeSpec, Level } from "@/types";

const blankGrid = [["start", "floor", "goal"] as const].map((row) => [...row]) as Level["grid"];

function codeLevel(
  id: string,
  name: string,
  description: string,
  chapter: string,
  lesson: string,
  kind: Exclude<ChallengeSpec["kind"], "robot">,
  objective: string,
  teachingSummary: string,
  requiredTokens: string[] = [],
  expectedOutput: string[] = [],
  minOutputLines = expectedOutput.length,
): Level {
  return {
    id,
    name,
    description,
    grid: blankGrid,
    startPosition: { x: 0, z: 0 },
    startDirection: 0,
    starterCode: "",
    challenge: { kind, chapter, lesson, objective, teachingSummary, requiredTokens, expectedOutput, minOutputLines },
  };
}

export const levels: Level[] = [
  codeLevel("console-hello", "Hello, Console", "Your first mission: make the console speak.", "Chapter 1 · JavaScript Basics", "console.log()", "console", "Print Hello Buildup to the console.", "console.log() sends a value to the console. Start by making the program say exactly what the mission asks.", ["console.log"], ["Hello Buildup"]),
  codeLevel("console-multiple", "Three Signals", "Print three separate status messages.", "Chapter 1 · JavaScript Basics", "Multiple outputs", "console", "Print READY, CODE, and GO on separate lines.", "You can call console.log() more than once. Each call creates another line of output.", ["console.log"], ["READY", "CODE", "GO"], 3),
  codeLevel("variables", "Memory Chip", "Store a value, then print it.", "Chapter 1 · JavaScript Basics", "Variables", "console", "Create a variable named playerName with the value Alex and print it.", "Variables give your program named memory. Use let or const to store information you will use later.", ["playerName", "console.log"], ["Alex"]),

  codeLevel("math-energy", "Energy Check", "Calculate the robot's final energy.", "Chapter 2 · Values & Logic", "Numbers and operators", "logic", "Start with 50 energy, add 25, then print the result.", "JavaScript can calculate with +, -, *, and /. Store intermediate values in variables to make your code readable.", ["energy", "console.log"], ["75"]),
  codeLevel("string-builder", "Identity Card", "Build a name from two pieces of text.", "Chapter 2 · Values & Logic", "Strings", "logic", "Create firstName = Mia and lastName = Chen, then print Mia Chen.", "Strings can be combined with + or template literals. Keep text values in variables so they can be reused.", ["firstName", "lastName", "console.log"], ["Mia Chen"]),
  codeLevel("if-energy", "Low Power", "Make a decision with if/else.", "Chapter 2 · Values & Logic", "Conditions", "logic", "If energy is below 20 print LOW POWER, otherwise print READY.", "if/else lets your program choose a path. Compare values with operators such as <, >, and ===.", ["if", "else", "energy", "console.log"], ["READY"]),

  codeLevel("for-countdown", "Countdown Loop", "Stop repeating yourself and use a loop.", "Chapter 3 · Loops", "for loops", "loop", "Use a for loop to print 1, 2, 3, 4, 5.", "A for loop repeats a block while a counter changes. The important skill is controlling the start, condition, and update.", ["for", "console.log"], ["1", "2", "3", "4", "5"], 5),
  codeLevel("while-charge", "Charge Cycle", "Keep charging while the battery is below 3.", "Chapter 3 · Loops", "while loops", "loop", "Use a while loop to print CHARGE three times.", "while is useful when repetition depends on a condition rather than a fixed count.", ["while", "console.log"], ["CHARGE", "CHARGE", "CHARGE"], 3),
  codeLevel("nested-grid", "Grid Scanner", "Use nested loops to scan rows and columns.", "Chapter 3 · Loops", "Nested loops", "loop", "Print nine X values using two nested loops.", "A nested loop is a loop inside another loop. It is useful for grids, tables, and repeated combinations.", ["for", "console.log"], ["X", "X", "X", "X", "X", "X", "X", "X", "X"], 9),

  codeLevel("function-greet", "Greeting Function", "Turn repeated logic into a reusable function.", "Chapter 4 · Functions", "Functions", "function", "Create greet(name) and print Hello, followed by the supplied name.", "Functions package instructions into reusable blocks. Parameters let the caller provide different values.", ["function", "greet", "console.log"], ["Hello Sam"]),
  codeLevel("function-return", "Score Calculator", "Return a calculated value from a function.", "Chapter 4 · Functions", "return", "function", "Create add(a, b), return the sum, and print add(7, 8).", "return sends a value back to the caller. That makes functions useful as small building blocks for larger programs.", ["function", "return", "add"], ["15"]),
  codeLevel("arrow-function", "Modern Function", "Rewrite a small function with arrow syntax.", "Chapter 4 · Functions", "Arrow functions", "function", "Create double(n) as an arrow function and print double(6).", "Arrow functions are concise function syntax used throughout modern JavaScript.", ["=>", "double", "console.log"], ["12"]),

  codeLevel("array-index", "Inventory Slot", "Read data from an array.", "Chapter 5 · Arrays", "Array basics", "data", "Create an array with sword, shield, potion and print the second item.", "Arrays store ordered collections. JavaScript indexes arrays from 0, so the second item is at index 1.", ["[", "console.log"], ["shield"]),
  codeLevel("array-filter", "Find Survivors", "Filter a list using a condition.", "Chapter 5 · Arrays", "filter()", "data", "From [12, 4, 21, 8], keep values above 10 and print the result.", "filter() creates a new array containing values that pass your test.", ["filter", "console.log"], ["12,21"]),
  codeLevel("map-powers", "Power Up", "Transform every item with map().", "Chapter 5 · Arrays", "map()", "data", "Use map() to add 10 to [10, 20, 30, 40] and print 20,30,40,50.", "map() transforms each item and returns a new array. It is one of the most important tools for working with data.", ["map", "console.log"], ["20,30,40,50"]),

  codeLevel("object-profile", "Player Profile", "Read a property from an object.", "Chapter 6 · Objects", "Objects", "data", "Create a player object with name Alex and level 5, then print the level.", "Objects group related named values. Access properties with dot notation such as player.level.", ["player", "level", "console.log"], ["5"]),
  codeLevel("destructure", "Quick Extract", "Destructure values from an object.", "Chapter 6 · Objects", "Destructuring", "data", "Destructure name and score from a player object and print them.", "Destructuring lets you pull properties into variables in one readable statement.", ["{", "name", "score", "console.log"], ["Alex 900"]),
  codeLevel("reduce-coins", "Coin Vault", "Combine an array into one value.", "Chapter 6 · Objects", "reduce()", "data", "Use reduce() to total [10, 20, 30, 40] and print 100.", "reduce() walks through an array and combines it into one result, such as a total, maximum, or grouped value.", ["reduce", "console.log"], ["100"]),

  codeLevel("dom-counter", "Web Counter", "Think like a frontend developer.", "Chapter 7 · Web", "Events and state", "web", "Create a count variable and simulate three button clicks by incrementing it, then print 3.", "Real websites are programs that respond to events. Start by modeling the state change behind a button click.", ["count", "++", "console.log"], ["3"]),
  codeLevel("web-form", "Form Validator", "Validate a signup field before accepting it.", "Chapter 7 · Web", "Validation", "web", "If username length is at least 3, print VALID; otherwise print TOO SHORT.", "Forms need validation before data is accepted. String properties and conditions are enough to model the core logic.", ["length", "if", "console.log"], ["VALID"]),
  codeLevel("data-dashboard", "Dashboard Data", "Turn raw data into a display-ready list.", "Chapter 7 · Web", "Rendering data", "web", "Map [10,20,30] into price labels $10, $20, $30 and print them.", "Frontend apps often transform API data before rendering it. map() is the bridge between raw data and UI-ready values.", ["map", "$", "console.log"], ["$10,$20,$30"]),

  codeLevel("promise-wait", "Async Signal", "Work with a Promise.", "Chapter 8 · Async JavaScript", "Promises", "async", "Create a resolved Promise with READY and print its value with then().", "A Promise represents a value that may arrive later. then() runs when that value is ready.", ["Promise", "then", "console.log"], ["READY"]),
  codeLevel("async-await", "Await the Mission", "Use async/await to simplify asynchronous code.", "Chapter 8 · Async JavaScript", "async/await", "async", "Create an async function, await a resolved Promise containing 42, and print 42.", "async/await makes asynchronous code read like normal step-by-step code while keeping it non-blocking.", ["async", "await", "console.log"], ["42"]),
  codeLevel("async-error", "Safe Loader", "Handle an asynchronous failure.", "Chapter 8 · Async JavaScript", "try/catch", "async", "Await a rejected Promise and catch it by printing ERROR.", "Network work can fail. try/catch gives your app a controlled error path instead of a crash.", ["try", "catch", "await", "console.log"], ["ERROR"]),

  codeLevel("api-get", "API Scout", "Make your first real HTTP request.", "Chapter 9 · APIs", "GET + JSON", "api", "Fetch JSON from https://jsonplaceholder.typicode.com/todos/1 and print its title.", "fetch() sends an HTTP request. The response must be converted with response.json() before you can use the data.", ["fetch", "await", "json", "console.log"], ["delectus aut autem"]),
  codeLevel("api-query", "API Search", "Send a query parameter to an API.", "Chapter 9 · APIs", "Query parameters", "api", "Fetch todos with ?userId=1 and print the number of returned records.", "APIs often accept query parameters to filter data. Build the URL, fetch it, parse JSON, then inspect the response.", ["fetch", "await", "json", "userId", "console.log"], [], 1),
  codeLevel("api-safe", "API Guard", "Build a resilient API request.", "Chapter 9 · APIs", "Loading and errors", "api", "Use async/await with try/catch, fetch the todo endpoint, and print API OK after parsing JSON.", "A production API call needs a success path and an error path. Always think about what happens when the network fails.", ["fetch", "await", "json", "try", "catch", "console.log"], ["API OK"]),

  codeLevel("project-weather", "Weather Dashboard", "Bring data, functions and async code together.", "Chapter 10 · Projects", "Mini project", "project", "Fetch a JSON resource, transform one field with a function, and print a clean dashboard line.", "Projects combine small skills. Break the task into data fetching, transformation, and presentation instead of writing everything at once.", ["fetch", "await", "function", "console.log"], [], 1),
  codeLevel("project-search", "Search Console", "Build the logic behind a search experience.", "Chapter 10 · Projects", "Search pipeline", "project", "Filter a list of names using a search term, map the matches to uppercase, and print the result.", "Search UIs are pipelines: filter the data first, transform the matches second, then render the result.", ["filter", "map", "toUpperCase", "console.log"], ["ALICE,ALI"]),
  codeLevel("final-mission", "Buildup Developer", "Solve a final challenge using the skills from the course.", "Chapter 10 · Projects", "Capstone", "project", "Create a users array, filter active users, map their names, and print the names. Use a function to perform the pipeline.", "The final skill is not memorizing syntax. It is choosing the right tools and combining them into a small, readable program.", ["function", "filter", "map", "console.log"], ["Alex,Mia"]),
];

export function getLevel(id: string) {
  return levels.find((level) => level.id === id);
}
