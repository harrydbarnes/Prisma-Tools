# Custom reminders and JSON export

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

Open Settings > Custom Reminders, enter a name and URL condition, and choose simple matching or advanced wildcard matching. Add page-text triggers with AND/OR logic as needed. Compose the reminder title, introduction and supported content, then save it. Edit or disable saved reminders from the list. Use Export Custom Reminders to generate JSON for copying. This is an export of custom reminders, not a backup of all extension settings; no corresponding import workflow is exposed. Matching is limited by the Mediaocean content-script injection scope.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: README custom-reminder summary; Settings editor and export instructions.

This draft addresses: Examples, wildcard scope, supported content and export-only limitation. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [settings.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
