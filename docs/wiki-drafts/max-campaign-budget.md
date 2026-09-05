# Max Campaign Budget

Draft feature guide for Ops Toolshed r1.9. Based on the reviewed source; live Prisma verification is still pending.

## What it does

Calculates a safe maximum campaign budget from the live billable response or a validated projection.

## Find and use it

1. Open **Settings > Features** from the extension popup.
2. Search for **Max Campaign Budget** and select the matching option. Its default is **true**.
3. Use Max Campaign Budget on an editable Buy Cost or active-month Actualise Gross payable cell. It uses the live billable response or a validated projection to close the budget gap. Review the inserted value and resulting total in Prisma, and use Revert change if needed. It is not a blanket instruction to maximise every booking. See https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/docs/prisma-campaign-budget-costings.md for the costing basis.

## If it is missing or behaves unexpectedly

Check that the popup’s **Features on** switch is enabled and that this individual setting is on. After reloading or updating the extension, reload the Prisma tab so it receives the current scripts. Features appear only where the relevant native Prisma controls exist; the extension does not add account permissions. Include the active route and whether you were in Plan, Buy, Actualise or Orders when reporting a problem.

## Storage and dependencies

The option uses Chrome sync storage key `maxCampaignBudgetEnabled`. Feature behaviour is implemented in `features/max-campaign-budget.js` and depends on the extension’s manifest script ordering. Campaign history, stats, remembered details and other local data have their own lifecycle; disabling an option is not equivalent to deleting its data.

## Documentation before this draft

release notes; detailed costing note in docs/prisma-campaign-budget-costings.md; Settings preview (335). This draft adds a standalone usage and troubleshooting page; brief UI descriptions and release notes are not complete operating instructions.

## Source references

- [settings.js:335](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L335)
- [features/max-campaign-budget.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/max-campaign-budget.js#L1)
