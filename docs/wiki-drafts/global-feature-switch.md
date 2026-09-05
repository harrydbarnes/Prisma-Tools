# Global feature switch

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

The Features on switch disables the listed feature toggles and custom reminders while keeping a snapshot for restoration. Click again to restore the saved settings. It is not the Chrome extension disable control: quick links and the extension itself remain available. Individual settings and the switch snapshot need one shared definition to prevent future drift.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: Popup control and release notes; no dedicated README guide.

This draft addresses: Exact scope and restoration semantics. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [popup.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
