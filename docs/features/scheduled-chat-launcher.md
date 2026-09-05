# Scheduled Chat Launcher

Draft feature guide for Ops Toolshed r1.9. Based on the reviewed source; live Prisma verification is still pending.

## What it does

Shows the chat launcher during its scheduled 10 AM to 12 PM window.

## Find and use it

1. Open **Settings > Features** from the extension popup.
2. Search for **Scheduled Chat Launcher** and select the matching option. Its default is **true**.
3. The launcher is controlled by the hard-coded 10 AM to 12 PM window in the browser’s local time. The Settings UI does not offer a custom schedule.

## If it is missing or behaves unexpectedly

Check that the popup’s **Features on** switch is enabled and that this individual setting is on. After reloading or updating the extension, reload the Prisma tab so it receives the current scripts. Features appear only where the relevant native Prisma controls exist; the extension does not add account permissions. Include the active route and whether you were in Plan, Buy, Actualise or Orders when reporting a problem.

## Storage and dependencies

The option uses Chrome sync storage key `scheduledChatToggleEnabled`. Feature behaviour is implemented in `features/live-chat-enhancements.js` and depends on the extension’s manifest script ordering. Campaign history, stats, remembered details and other local data have their own lifecycle; disabling an option is not equivalent to deleting its data.

## Documentation before this draft

README summary; Settings preview (353). This draft adds a standalone usage and troubleshooting page; brief UI descriptions and release notes are not complete operating instructions.

## Source references

- [settings.js:353](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L353)
- [features/live-chat-enhancements.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/live-chat-enhancements.js#L1)
