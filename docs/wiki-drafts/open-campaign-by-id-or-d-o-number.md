# Open campaign by ID or D/O number

Draft feature guide for Ops Toolshed r1.9. Based on source inspection; live service verification is pending.

## Purpose and usage

Enter a seven-character Campaign ID starting with C, optionally add a month and year, and choose the left Open Campaign button. The destination is Actualise; a blank month uses the current month. Supported examples include July 2026, 07/2026 and 2026-07. Alternatively enter D followed by eight digits, or O- followed by five alphanumeric characters, and choose the right Open Campaign button. Revision suffixes such as -R1 are stripped. Use valid calendar months: the current parser incorrectly rolls 13/2026 into January 2027.

## Access and troubleshooting

Open the extension popup or the Settings tab described above. If the feature cannot reach its target, confirm that you are signed in to the relevant Mediaocean, SharePoint or Meta account and that your account has access. After an extension update, reload an already-open Prisma tab before retrying. Report the step, visible error and page context rather than sharing access tokens.

## Existing documentation and remaining gap

Previously available: README describes CP and D lookup; O format appears in popup validation.

This draft addresses: Full input formats, destination and error handling. Any stated current limitation remains a limitation until its implementation is changed.

## Source

- [popup.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.js#L1)
- [README.md:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/README.md#L1)
