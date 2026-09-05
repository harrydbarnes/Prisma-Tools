# Legacy Meta Billing Check

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

Select Billing Check under Settings > Features > Meta finance tool. Open the Meta Ads Manager campaigns page and launch the tool from the extension popup. It scrapes the displayed campaign grid into a CSV. It depends on the active page and native DOM; it is not the newer CSV comparison engine or the Meta API refresh. If the tab is not the campaigns view, the launcher returns an error.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: README no longer describes the scraper in detail; Settings mode control and source.

This draft addresses: Active-tab requirements, expected columns and distinction from Booking Checker. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [background/meta-billing-scraper.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/background/meta-billing-scraper.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
