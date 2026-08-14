# Listeing-To-Activity

Zobrazuje skladbu, kterou právě přehráváš v desktopové aplikaci **Spotify** na Macu, jako Discord Rich Presence (stavovka „Listening to...“ s obalem alba).

Zdrojem dat je výhradně desktopová aplikace Spotify na tomto počítači (přes AppleScript) – žádný jiný přehrávač ani Spotify Web/mobil se nesledují.

## Instalace

Vyžaduje macOS, Node.js 18+ a nainstalovaný Discord desktop.

```bash
npm install
```

## Použití

```bash
npm run start
```

Skript se přihlásí k Discord RPC a každé 2 sekundy zkontroluje, co hraje ve Spotify. Když se skladba změní, aktualizuje se Rich Presence; když Spotify nehraje (je zavřená nebo na pauze), stavovka zmizí.

## Konfigurace

Discord Application ID je natvrdo v [main.ts](main.ts):

```ts
clientId: "1498751319404707941"
```

Pro vlastní Discord aplikaci ho stačí nahradit.
