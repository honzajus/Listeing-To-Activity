# Listeing-To-Activity

Shows the track currently playing in the **Spotify** desktop app on your Mac as a Discord Rich Presence status (a "Listening to..." status with the album cover).

The only data source is the Spotify desktop app on this machine (via AppleScript) — no other player, and no Spotify Web/mobile, is tracked.

## Installation

Requires macOS, Node.js 18+, and the Discord desktop app installed.

```bash
npm install
```

## Usage

```bash
npm run start
```

The script logs into Discord RPC and checks what's playing in Spotify every 2 seconds. The Rich Presence updates when the track changes, and clears when Spotify isn't playing (closed or paused).

## Configuration

The Discord application ID is hardcoded in [main.ts](main.ts):

```ts
clientId: "1498751319404707941"
```

Replace it with your own Discord application ID if needed.
