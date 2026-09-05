# Social Booking Checker

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

Open Social Booking Checker from the popup. Upload the Meta campaign CSV and Prisma booking CSV, confirm selected accounts/months, then compare and review actions. Exact campaign-ID and month evidence drives matching; name similarity only supplies investigation candidates. Missing booking claims require adequate account-month coverage. Review suggested PO matches before accepting them. Export filtered results for action or the full audit for traceability. TikTok, Snap and Pinterest are visibly marked Coming soon and are not implemented comparison platforms. The checker does not book or reconcile values in Prisma on your behalf.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: README summary; docs/social-booking-checker-meta-api.md; release notes and in-tool guidance.

This draft addresses: End-to-end guide, examples and interpretation of each result state. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [social-finance.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/social-finance.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
