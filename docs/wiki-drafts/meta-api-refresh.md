# Meta API refresh

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

From Social Booking Checker, save a Meta access token and load the report-derived Account IDs. Use the read-only refresh flow for the selected date range. The implementation uses Graph API v24.0, Authorization bearer headers, pagination and rate-limit retries. The token is saved locally rather than in sync storage. Permission errors require checking the token owner’s account access and ads_read scope. Use the credential removal control when the saved token is no longer needed. No Meta credentials were requested or used during this review.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: Detailed docs/social-booking-checker-meta-api.md.

This draft addresses: User-facing token lifecycle and permission troubleshooting; technical basis already exists. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [meta-report-api.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/meta-report-api.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
