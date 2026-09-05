# IAS booking reminder

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

Enable the IAS reminder under Settings > Reminders. On matching Prisma content, read the booking reminder and dismiss it with Got it after any configured countdown. It shares the Prisma reminder frequency and theme. A missing reminder does not prove a booking is complete, because detection depends on the current page content.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: README reminders summary and Settings controls.

This draft addresses: Trigger details and troubleshooting. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [features/reminders.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/reminders.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
