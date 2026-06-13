# UNI Media Player Discord Rich Presence

Display your currently playing music from UNI Media Player as a Discord Rich Presence status.

## Features

* Shows the current track title and artist in Discord
* Automatically updates when the song changes
* Fetches album artwork from the iTunes Search API
* Displays track artwork as the large Rich Presence image
* Lightweight and runs in the background

## Requirements

* Node.js 18+
* Discord desktop application
* UNI Media Player
* `nowplaying-cli`

## Installation

```bash
git clone https://github.com/yourusername/uni-media-player-rpc.git
cd uni-media-player-rpc
npm install
```

## Dependencies

```bash
npm install @xhayper/discord-rpc axios
```

## Usage

Start the application:

```bash
npm run start
```

or

```bash
npx tsx index.ts
```

## How It Works

The application:

1. Reads the currently playing track using `nowplaying-cli`
2. Retrieves album artwork from the iTunes Search API
3. Connects to Discord Rich Presence
4. Updates your Discord status every 5 seconds
5. Refreshes only when the track changes

## Rich Presence Example

**Details**

```
Song Title
```

**State**

```
Artist Name
```

**Large Image**

```
Album Artwork
```

**Small Image**

```
UNI Media Player
```

## Configuration

The Discord application ID is configured directly in the source:

```ts
clientId: "1498751319404707941"
```

Replace it with your own Discord application ID if needed.

## License

MIT
