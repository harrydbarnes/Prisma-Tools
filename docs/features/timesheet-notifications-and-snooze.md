# Timesheet notifications and snooze

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

Open Settings > Reminders > Aura Reminders, enable timesheet reminders and choose the day/time. Defaults are Friday at 14:30 in the browser’s local timezone. The notification offers Open My Timesheets or Snooze for 15 minutes and uses the offscreen audio document. Browser/OS notification permissions still apply. The recurring alarm uses a fixed seven-day interval, so local time can drift across daylight-saving changes; reopening Chrome also needs an alarm-existence recovery path.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: README reminders summary and Settings Aura controls.

This draft addresses: Schedule timezone, notification permissions, snooze and DST limitations. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [background.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/background.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
