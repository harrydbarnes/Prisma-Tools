# DST Assurance

Draft feature guide for Ops Toolshed r1.9. Based on the reviewed source; live Prisma verification is still pending.

## What it does

Checks Facebook media for a correctly supplied Meta Location Fee at 2% of booked media.

## Find and use it

1. Open **Settings > Features** from the extension popup.
2. Search for **DST Assurance** and select the matching option. Its default is **true**.
3. Read the DST badge beside the approval widget. For supported Facebook bookings from July 2026 onwards it checks Meta Location Fee at 2% of Facebook Cost, or Planned Cost for supported straddling flights in Flighting Layout. Standard-layout straddling bookings require verification. Google/DV360 and Amazon DST costs are not automatically verified. Treat a yellow badge as a review request, not an instruction to apply the same arithmetic to every platform.

## If it is missing or behaves unexpectedly

Check that the popup’s **Features on** switch is enabled and that this individual setting is on. After reloading or updating the extension, reload the Prisma tab so it receives the current scripts. Features appear only where the relevant native Prisma controls exist; the extension does not add account permissions. Include the active route and whether you were in Plan, Buy, Actualise or Orders when reporting a problem.

## Storage and dependencies

The option uses Chrome sync storage key `dstAssuranceEnabled`. Feature behaviour is implemented in `features/dst-assurance.js` and depends on the extension’s manifest script ordering. Campaign history, stats, remembered details and other local data have their own lifecycle; disabling an option is not equivalent to deleting its data.

## Documentation before this draft

release notes; Settings preview (344). This draft adds a standalone usage and troubleshooting page; brief UI descriptions and release notes are not complete operating instructions.

## Source references

- [settings.js:344](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L344)
- [features/dst-assurance.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/dst-assurance.js#L1)
