# Feedback and email handoff

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

Open Submit Feedback, choose the section/type and complete the required details. Review the second step and submit to open a prefilled email. The form uses mailto and relies on your email application; it does not silently send a server-side ticket. The extension remembers the entered name locally. Check your email application and send the draft yourself. The Help Guides variant uses its own content fields.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: README feedback summary and form UI.

This draft addresses: Required fields, remembered name, mailto behaviour and successful handoff definition. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [features/feedback-modal.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/feedback-modal.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
