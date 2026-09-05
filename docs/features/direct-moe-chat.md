# Direct Moe Chat

Draft feature guide for Ops Toolshed r1.9. Based on the reviewed source; live Prisma verification is still pending.

## What it does

Opens the AI chat directly with Moe from Prisma’s help flow.

## Find and use it

1. Open **Settings > Features** from the extension popup.
2. Search for **Direct Moe Chat** and select the matching option. Its default is **true**.
3. Open the AI help flow in Prisma to connect directly with Moe. This is a shortcut to the existing service, not a new AI provider or model configuration.

## If it is missing or behaves unexpectedly

Check that the popup’s **Features on** switch is enabled and that this individual setting is on. After reloading or updating the extension, reload the Prisma tab so it receives the current scripts. Features appear only where the relevant native Prisma controls exist; the extension does not add account permissions. Include the active route and whether you were in Plan, Buy, Actualise or Orders when reporting a problem.

## Storage and dependencies

The option uses Chrome sync storage key `directMoeChatEnabled`. Feature behaviour is implemented in `features/live-chat-enhancements.js` and depends on the extension’s manifest script ordering. Campaign history, stats, remembered details and other local data have their own lifecycle; disabling an option is not equivalent to deleting its data.

## Documentation before this draft

release notes; Settings preview (354). This draft adds a standalone usage and troubleshooting page; brief UI descriptions and release notes are not complete operating instructions.

## Source references

- [settings.js:354](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L354)
- [features/live-chat-enhancements.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/live-chat-enhancements.js#L1)
