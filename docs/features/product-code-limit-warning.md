# Product Code Limit Warning

Draft feature guide for Ops Toolshed r1.9. Based on the reviewed source; live Prisma verification is still pending.

## What it does

Warns when a client/product code is approaching Prisma’s 254-campaign limit.

## Find and use it

1. Open **Settings > Features** from the extension popup.
2. Search for **Product Code Limit Warning** and select the matching option. Its default is **true**.
3. The badge warns when the known count exceeds 200 campaigns, becomes orange above 220 and red above 250, against the encoded 254-campaign limit. Hover or focus for detail and use the ignore control only for a reviewed code. Reset ignored warnings from Settings > Features. Counts depend on the native data query and current account context.

## If it is missing or behaves unexpectedly

Check that the popup’s **Features on** switch is enabled and that this individual setting is on. After reloading or updating the extension, reload the Prisma tab so it receives the current scripts. Features appear only where the relevant native Prisma controls exist; the extension does not add account permissions. Include the active route and whether you were in Plan, Buy, Actualise or Orders when reporting a problem.

## Storage and dependencies

The option uses Chrome sync storage key `productCodeLimitWarningEnabled`. Feature behaviour is implemented in `features/product-code-limit-warning.js` and depends on the extension’s manifest script ordering. Campaign history, stats, remembered details and other local data have their own lifecycle; disabling an option is not equivalent to deleting its data.

## Documentation before this draft

release notes; Settings preview (346). This draft adds a standalone usage and troubleshooting page; brief UI descriptions and release notes are not complete operating instructions.

## Source references

- [settings.js:346](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L346)
- [features/product-code-limit-warning.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/product-code-limit-warning.js#L1)
