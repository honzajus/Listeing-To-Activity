import { Client } from "@xhayper/discord-rpc";
import { exec } from "child_process";

const client = new Client({
  clientId: "1498751319404707941",
});

function run(cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout) => {
      if (err) return reject(err);
      resolve(stdout.toString().trim());
    });
  });
}

function osascript(script: string): Promise<string> {
  return run(`osascript -e '${script}'`);
}

type Track = {
  artist: string;
  title: string;
  album: string;
  artwork?: string;
  durationMs: number;
  positionMs: number;
};

async function getNowPlaying(): Promise<Track | null> {
  try {
    const isRunning = await osascript('application "Spotify" is running');
    if (isRunning !== "true") return null;

    const state = await osascript(
      'tell application "Spotify" to player state as string'
    );
    if (state !== "playing") return null;

    const [artist, title, album, artwork, duration, position] = await Promise.all([
      osascript('tell application "Spotify" to artist of current track as string'),
      osascript('tell application "Spotify" to name of current track as string'),
      osascript('tell application "Spotify" to album of current track as string'),
      osascript('tell application "Spotify" to artwork url of current track as string'),
      osascript('tell application "Spotify" to duration of current track as string'),
      osascript("tell application \"Spotify\" to player position as string"),
    ]);

    if (!artist || !title) return null;

    const durationMs = parseInt(duration, 10);
    const positionMs = Math.round(parseFloat(position.replace(",", ".")) * 1000);

    const track = { artist, title, album, durationMs, positionMs };
    return artwork ? { ...track, artwork } : track;
  } catch {
    return null;
  }
}

async function start() {
  await client.login();

  console.log("RPC ready");

  let last = "";

  setInterval(async () => {
    const track = await getNowPlaying();

    if (!track) {
      if (last) {
        last = "";
        await client.user?.clearActivity();
      }
      return;
    }

    const key = `${track.artist}-${track.title}`;
    if (key === last) return;
    last = key;

    const startTimestamp = Date.now() - track.positionMs;
    const endTimestamp = startTimestamp + track.durationMs;

    await client.user?.setActivity({
      type: 2,

      details: track.title,
      state: track.artist,

      name: `${track.title}`,

      largeImageKey: track.artwork ?? "spotify",
      largeImageText: track.album,

      smallImageKey: "icon",
      smallImageText: "UNI Media Player",

      startTimestamp,
      endTimestamp,
    });
  }, 2000);
}

start().catch(console.error);