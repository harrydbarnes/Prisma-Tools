# Approver directory and favourites

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

Open Prisma Approvers from the popup. Search the maintained list and filter by business unit, function, client/office or company user ID. Select recipients and copy addresses, or save selections to favourites and copy. Review the recipients before pasting into Prisma. The list is bundled with the extension, so a newly appointed approver may need a data update. Clipboard failures currently lack an error message on these directory actions.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: README Approver tools summary.

This draft addresses: Detailed filters, favourites and failure states. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [approvers.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/approvers.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
