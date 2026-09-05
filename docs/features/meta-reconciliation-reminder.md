# Meta reconciliation reminder

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

In Settings > Reminders, enable the Meta reminder. It checks supported Prisma Actualise pages and page content before showing the Meta reconciliation message. Frequency and countdown are shared Prisma reminder settings; defaults are daily and five seconds. Read the reminder and use Got it when enabled. This is a contextual reminder, not an automatic reconciliation or a complete audit of all Meta bookings.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: README reminders summary and Settings controls.

This draft addresses: Exact triggering prerequisites, frequency and dismissal behaviour. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [features/reminders.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/reminders.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
