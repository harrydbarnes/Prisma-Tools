# Campaign History search

Draft feature guide for Ops Toolshed r1.9. Based on the reviewed source; live Prisma verification is still pending.

## What it does

Adds a History link to Prisma campaign navigation and lets you search campaigns you have visited.

## Find and use it

1. Open **Settings > Features** from the extension popup.
2. Search for **Campaign History search** and select the matching option. Its default is **true**.
3. Use History in Prisma navigation. Search campaign name, client, CP, CL/PR/CA, supplier or location. The compact panel shows four results per page; Expand shows the full matching list. Escape clears a non-empty search first, then closes the panel. The separately proposed resize change adds a bottom-left drag handle, arrow-key sizing and Home to reset. The existing 640px desktop default stays unchanged. Resizing is not saved across closes. History only contains locally recorded visits, not every campaign in Prisma.

## If it is missing or behaves unexpectedly

Check that the popup’s **Features on** switch is enabled and that this individual setting is on. After reloading or updating the extension, reload the Prisma tab so it receives the current scripts. Features appear only where the relevant native Prisma controls exist; the extension does not add account permissions. Include the active route and whether you were in Plan, Buy, Actualise or Orders when reporting a problem.

## Storage and dependencies

The option uses Chrome sync storage key `campaignHistoryEnabled`. Feature behaviour is implemented in `features/campaign-history.js` and depends on the extension’s manifest script ordering. Campaign history, stats, remembered details and other local data have their own lifecycle; disabling an option is not equivalent to deleting its data.

## Documentation before this draft

README summary; Settings preview (325). This draft adds a standalone usage and troubleshooting page; brief UI descriptions and release notes are not complete operating instructions.

## Source references

- [settings.js:325](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L325)
- [features/campaign-history.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/campaign-history.js#L1)
