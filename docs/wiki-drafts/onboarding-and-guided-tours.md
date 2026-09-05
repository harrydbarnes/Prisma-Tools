# Onboarding and guided tours

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

A new installation opens the introduction. Follow its steps to reach the guided experience. Settings also exposes the existing V1 and V2 tour launchers; the current first-run flow opens V2 in a side panel. The in-page guide highlights supported Prisma targets, so a step may depend on the page being open. Two versions remain intentionally reachable and should not be deleted as dead code without deciding which experience to retain.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: First-run UI, Settings tour launchers and release notes.

This draft addresses: First-run sequence, replay instructions and version ownership. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [onboarding.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/onboarding.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
