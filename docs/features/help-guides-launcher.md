# Help Guides launcher

Draft feature guide for Ops Toolshed r1.9. Based on the reviewed source; live Prisma verification is still pending.

## What it does

Adds a draggable launcher that opens searchable Prisma help guides.

## Find and use it

1. Open **Settings > Features** from the extension popup.
2. Search for **Help Guides launcher** and select the matching option. Its default is **true**.
3. Click the draggable Help Guides launcher, then search or select a guide. The current catalogue is incomplete: most named guides point to a dummy PDF, with two SharePoint test entries. A guide title is not proof that the correct document has been connected. SharePoint access still requires your organisation account.

## If it is missing or behaves unexpectedly

Check that the popup’s **Features on** switch is enabled and that this individual setting is on. After reloading or updating the extension, reload the Prisma tab so it receives the current scripts. Features appear only where the relevant native Prisma controls exist; the extension does not add account permissions. Include the active route and whether you were in Plan, Buy, Actualise or Orders when reporting a problem.

## Storage and dependencies

The option uses Chrome sync storage key `helpGuidesEnabled`. Feature behaviour is implemented in `features/help-guides-launcher.js` and depends on the extension’s manifest script ordering. Campaign history, stats, remembered details and other local data have their own lifecycle; disabling an option is not equivalent to deleting its data.

## Documentation before this draft

release notes; Settings preview (319). This draft adds a standalone usage and troubleshooting page; brief UI descriptions and release notes are not complete operating instructions.

## Source references

- [settings.js:319](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L319)
- [features/help-guides-launcher.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/help-guides-launcher.js#L1)
