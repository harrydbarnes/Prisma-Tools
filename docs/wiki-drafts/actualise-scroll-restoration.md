# Actualise scroll restoration

Draft feature guide for Ops Toolshed r1.9. Based on the reviewed source; live Prisma verification is still pending.

## What it does

Restores the active grid’s horizontal position after an Actualise save refresh.

## Find and use it

1. Open **Settings > Features** from the extension popup.
2. Search for **Actualise scroll restoration** and select the matching option. Its default is **true**.
3. After a save refresh in Actualise, the feature restores the horizontal grid position. It does not restore unsaved values or make a failed save succeed.

## If it is missing or behaves unexpectedly

Check that the popup’s **Features on** switch is enabled and that this individual setting is on. After reloading or updating the extension, reload the Prisma tab so it receives the current scripts. Features appear only where the relevant native Prisma controls exist; the extension does not add account permissions. Include the active route and whether you were in Plan, Buy, Actualise or Orders when reporting a problem.

## Storage and dependencies

The option uses Chrome sync storage key `actualiseScrollRestoreEnabled`. Feature behaviour is implemented in `features/actualise-scroll-restore.js` and depends on the extension’s manifest script ordering. Campaign history, stats, remembered details and other local data have their own lifecycle; disabling an option is not equivalent to deleting its data.

## Documentation before this draft

README summary; Settings preview (356). This draft adds a standalone usage and troubleshooting page; brief UI descriptions and release notes are not complete operating instructions.

## Source references

- [settings.js:356](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L356)
- [features/actualise-scroll-restore.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/actualise-scroll-restore.js#L1)
