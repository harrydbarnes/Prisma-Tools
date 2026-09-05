# Log campaigns visited

Draft feature guide for Ops Toolshed r1.9. Based on the reviewed source; live Prisma verification is still pending.

## What it does

Records campaign names, references, supplier details and active account locations locally so they can be found later in Campaign History.

## Find and use it

1. Open **Settings > Features** from the extension popup.
2. Search for **Log campaigns visited** and select the matching option. Its default is **true**.
3. Leave this on to record visited campaign references, names, supplier details and active account locations on this browser profile. Up to 2,000 entries are retained. Turning logging off stops new collection but does not erase existing history. Viewing is separately controlled by Campaign History search. There is currently no history-specific clear/export interface, and concurrent tab writes need improvement.

## If it is missing or behaves unexpectedly

Check that the popup’s **Features on** switch is enabled and that this individual setting is on. After reloading or updating the extension, reload the Prisma tab so it receives the current scripts. Features appear only where the relevant native Prisma controls exist; the extension does not add account permissions. Include the active route and whether you were in Plan, Buy, Actualise or Orders when reporting a problem.

## Storage and dependencies

The option uses Chrome sync storage key `campaignHistoryLoggingEnabled`. Feature behaviour is implemented in `features/campaign-history.js` and depends on the extension’s manifest script ordering. Campaign history, stats, remembered details and other local data have their own lifecycle; disabling an option is not equivalent to deleting its data.

## Documentation before this draft

README summary; Settings preview (326). This draft adds a standalone usage and troubleshooting page; brief UI descriptions and release notes are not complete operating instructions.

## Source references

- [settings.js:326](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L326)
- [features/campaign-history.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/campaign-history.js#L1)
