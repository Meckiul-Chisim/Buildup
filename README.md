 # CodeQuest

CodeQuest is a native 3D coding puzzle game. Players write JavaScript against a small `robot` API, then watch the recorded actions animate through a grid maze.

## Commands

```bash
```bash
npm install
npx expo start --dev-client
```
Edit `src/app/index.tsx` to change the first screen. Tailwind classes are scanned from `src` and the global stylesheet is loaded by `src/app/_layout.tsx`.
This project uses `expo-gl` and React Three Fiber, so it must run in a custom development client. Expo Go does not contain the native GL modules used by CodeQuest.
## Get started
## Development client
1. Install dependencies
Build the Android development client with EAS, install the resulting APK on a physical device, then start Metro in dev-client mode:
   ```bash

npx eas-cli build --profile development --platform android
npx expo start --dev-client

```bash
Verify in order: the GL surface renders, a level grid and stationary robot render, then run the starter programs and confirm both loop and sensing levels can be won. Also run a wall collision to confirm the failure modal.
```
The sandbox is intentionally a local-MVP isolation boundary, not a security boundary. Player code runs once in `new Function("robot", "console", ...)`, with a 500 robot-call cap, then the recorded action log is animated.
- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
