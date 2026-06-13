import { Client } from "@xhayper/discord-rpc";
import { exec } from "child_process";
import axios from "axios";

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

type Track = {
  artist: string;
  title: string;
  artwork?: string;
};

async function getITunesArtwork(title: string, artist: string) {
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
      `${artist} ${title}`
    )}&entity=song&limit=1`;

    const res = await axios.get(url);
    const song = res.data?.results?.[0];

    if (!song?.artworkUrl100) return undefined;

    return song.artworkUrl100.replace("100x100bb.jpg", "512x512bb.jpg");
  } catch {
    return undefined;
  }
}

async function getNowPlaying(): Promise<Track | null> {
  try {
    const artist = await run("nowplaying-cli get artist");
    const title = await run("nowplaying-cli get title");

    if (!artist || !title) return null;

    const artwork = await getITunesArtwork(title, artist);

    return {
      artist,
      title,
      artwork,
    };
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
    if (!track) return;

    const key = `${track.artist}-${track.title}`;
    if (key === last) return;
    last = key;

    await client.user?.setActivity({
      type: 2,

      details: track.title,
      state: track.artist,

      name: `Listening to ${track.title}`,

      largeImageKey: track.artwork ?? "spotify",
      largeImageText: track.title,

      smallImageKey: "icon",
      smallImageText: "UNI Media Player",

      startTimestamp: Date.now(),
    });
  }, 5000);
}

start().catch(console.error);