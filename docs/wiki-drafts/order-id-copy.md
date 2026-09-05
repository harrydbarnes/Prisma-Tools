# Order ID copy

Draft feature guide for Ops Toolshed r1.9. Based on the reviewed source; live Prisma verification is still pending.

## What it does

Lets you click an Order ID in the new Orders sidebar to copy it.

## Find and use it

1. Open **Settings > Features** from the extension popup.
2. Search for **Order ID copy** and select the matching option. Its default is **true**.
3. Use the copy control beside an Order ID. The extension strips the revision suffix, so the copied identifier is suitable for looking up the underlying order. A toast confirms success or reports failure.

## If it is missing or behaves unexpectedly

Check that the popup’s **Features on** switch is enabled and that this individual setting is on. After reloading or updating the extension, reload the Prisma tab so it receives the current scripts. Features appear only where the relevant native Prisma controls exist; the extension does not add account permissions. Include the active route and whether you were in Plan, Buy, Actualise or Orders when reporting a problem.

## Storage and dependencies

The option uses Chrome sync storage key `orderIdCopyEnabled`. Feature behaviour is implemented in `features/order-id-copy.js` and depends on the extension’s manifest script ordering. Campaign history, stats, remembered details and other local data have their own lifecycle; disabling an option is not equivalent to deleting its data.

## Documentation before this draft

README summary; release notes; Settings preview (334). This draft adds a standalone usage and troubleshooting page; brief UI descriptions and release notes are not complete operating instructions.

## Source references

- [settings.js:334](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L334)
- [features/order-id-copy.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/order-id-copy.js#L1)
