# Loading fact review and export

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

Open Settings > Loading Facts to review the current catalogue and collected feedback. Mark an item Unrated, Not sure or Remove and use Export ratings for the next catalogue update. A removal rating is editorial feedback rather than proof that a new extension release has removed the fact. Ratings are stored locally. This is separate from the toggle that displays facts in Prisma.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: Settings Loading Facts tab; short release-note references.

This draft addresses: Rating meaning, storage and catalogue-update workflow. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [settings.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
