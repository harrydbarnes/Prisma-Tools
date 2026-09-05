# Ops Toolshed Extension review

Reviewed 5 September 2026. Scope: **r1.9**, commit `b5a723e6d8f6acfeeb80e9a590eb57f12229b92d` (4 September), rather than stale default `main` at `bc565b9` (29 January, version 1.2). Findings describe the baseline; the explicitly requested resize change is identified separately. No other suggested fixes were silently implemented.

**Assessment:** this is a useful, substantially tested extension with sensible feature separation and no need for a new hosted backend. The immediate priorities are making CI cover the active branch, replacing placeholder Help Guide destinations, fixing popup input/accessibility failures, and serialising campaign-history writes centrally. Documentation breadth is better than the short README alone suggests, but operating instructions are scattered across Settings, release notes and three technical notes.

## Verification and limits

- Clean `npm ci` succeeded; the extension has no compile step.
- Baseline: **77 suites, 743 tests; 742 passed and one failed**. The failure is a timezone-dependent expectation in Stats Manager. The focused seven-test stats suite passes with `TZ=UTC`.
- Requested resize change: **16 campaign-history tests passed**, including keyboard resize, pointer resize, viewport clamping, resetting, and existing expand/minimise tests.
- Final full suite with `TZ=UTC`: **77 suites and 744 tests passed** after adding the resize regression test. The original timezone-sensitive test is unchanged.
- Syntax check: **148 JavaScript files passed**.
- Observer benchmark: 80 mutation batches became one fast and one deferred reconciliation; extension-owned noise caused zero feature calls. The measured 0.09ms is synthetic scheduler time, not live Prisma rendering performance.
- `npm audit` returned **three high-severity development dependency findings**: brace-expansion, browserslist and js-yaml, each with a fix available. These are not evidence of three installed-extension runtime vulnerabilities. Vendored browser assets are outside this audit.
- The newest five Actions runs returned by GitHub all passed on **r1.6**, latest 31 July. They do not validate r1.9. No GitHub releases were returned by the releases API.
- Browser verification was blocked by `ERR_BLOCKED_BY_CLIENT` for both local preview addresses. No signed-in Prisma/Aura tab was available. UI observations below come from HTML/CSS, event handling and tests, not screenshots or live account execution.
- GitHub wiki cloning required unavailable authentication. Existing wiki coverage is **unknown**, and no wiki publication is claimed.

## 1. Scope and dependencies

### What it covers

The toolbar launches internal Operations tools, campaign lookup and location switching. Prisma enhancements cover campaign navigation and copying, account identity/switching, Add Campaign automation, Orders layout and copying, approval widgets/recipients, Actualise shortcuts/export/month checks/scroll restoration, DST and product-code warnings, reminders, support chat, help guides, local campaign history, loading facts, statistics, onboarding and feedback. Social Booking Checker compares Meta and Prisma CSVs, optionally refreshing Meta data through its read-only API client. The legacy Meta grid scraper remains selectable.

TikTok, Snap and Pinterest are labelled Coming soon in the checker, rather than implemented platforms. [social-finance.html:56](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/social-finance.html#L56)

| Dependency | Role and assessment |
|---|---|
| Chrome MV3 APIs, minimum version 116 | Storage, service worker, alarms, offscreen clipboard/audio, scripting, tabs and help side panel. Appropriate to an extension; actual compatibility with the declared minimum needs a browser matrix. |
| Prisma/Mediaocean DOM, Shadow DOM and native responses | Primary integration. Most breakage risk comes from upstream selectors/routes changing, not from npm runtime libraries. |
| Aura and internal Operations destinations | Navigation and timesheets rely on existing organisation access. No extension-hosted identity service. |
| SharePoint | Help Guide retrieval uses authenticated fetch. Embedded documents need actual permissions and valid targets. |
| Meta Graph API v24.0 | Optional direct read-only refresh; bearer token saved in local Chrome storage, account IDs derived from reports. Pin is explicit; this review does not claim v24.0 is unsupported. |
| Bundled PDF.js 6.1.200 | Used by the guide viewer; keep library and worker in lockstep and check newer releases against the minimum browser. Apache licence is included. |
| Bundled canvas-confetti 1.6.0 | Used for stats milestones, so not dead code. Upstream lists 1.9.4; update separately and honour reduced-motion preferences. |
| Google Fonts and Font Awesome 6.6.0 CDN CSS | Popup has local styles/icons, but Settings, Approvers, onboarding and other pages still load external fonts; Approvers also loads remote icon CSS. |
| Jest, Babel, jsdom, Husky | Development dependencies, not required to run the unpacked extension. Do not ship node_modules. |

Evidence: [manifest.json:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/manifest.json#L1); [meta-report-api.js:6](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/meta-report-api.js#L6); [social-finance.js:65](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/social-finance.js#L65); [help-guides.js:520](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/help-guides.js#L520); [features/confetti.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/confetti.js#L1); [toolshed.js:551](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/toolshed.js#L551); [approvers.html:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/approvers.html#L1). Current upstream references: [PDF.js releases](https://github.com/mozilla/pdf.js/releases), [canvas-confetti releases](https://github.com/catdad/canvas-confetti/releases).

### Bugs/issues

- **High: Help Guides mostly point to a test PDF.** Named operational guides use `TEST_PDF_URL`, a W3C dummy document, with only two explicit SharePoint test entries. A polished search result can therefore open the wrong content. Replace the catalogue targets before presenting it as a complete operational library. [help-guides-data.js:4](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/help-guides-data.js#L4)
- **Medium: known vulnerable development transitive dependencies.** Audit returned brace-expansion, browserslist and js-yaml. Refresh compatible lockfile resolutions and retest; do not use an indiscriminate forced major upgrade. Evidence: `package-lock.json` and captured audit results.
- **Low: package repository, bugs and homepage URLs still use EMC-Toolshed-Extension.** Even if GitHub redirects, metadata should match the actual repo. [package.json:18](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/package.json#L18)

### Suggestions

- Keep the no-runtime-npm architecture. Current installed → registry latest: Babel core 7.29.7 → 8.0.1; preset-env 7.28.5 → 8.0.2; babel-jest 30.4.1 → 30.5.1; Jest 30.4.2 → 30.5.1; Jest jsdom environment 30.4.1 → 30.5.1; jsdom 26.1.0 → 30.0.1; Husky 8.0.3 → 9.1.7. These are update candidates, not instructions to migrate every major at once. The compatible wanted preset-env is 7.29.7.
- Declare `@babel/parser` directly: the syntax checker imports it but currently relies on Babel’s transitive dependency. [scripts/check-syntax.js:3](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/scripts/check-syntax.js#L3)
- Bundle remaining fonts/icons locally and keep a third-party asset/version/licence inventory. Retain PDF.js and confetti only in the pages that use them.
- Audit permission scope against feature ownership. Broad Mediaocean content injection is wider than the explicit Prisma host list, so the effective scope must be reviewed from the complete manifest. Do not remove clipboard, activeTab, scripting or sidePanel merely because they look broad: active code uses them. [manifest.json:54](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/manifest.json#L54)

## 2. Build and CI quality

### Good foundations

The workflow is short, has read-only repository permissions, a ten-minute timeout, npm caching, reproducible `npm ci` and serial Jest. A plain MV3 extension does not need a bundler just to become “buildable”. [.github/workflows/tests.yml:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/.github/workflows/tests.yml#L1)

### Bugs/issues

1. **High: push CI misses active development.** The only push branches are main and r1.6. r1.7, r1.8 and r1.9 pushes do not match; pull requests do. Latest successful r1.6 runs are therefore misleading evidence for today’s extension. [.github/workflows/tests.yml:5](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/.github/workflows/tests.yml#L5) [Latest returned run](https://github.com/harrydbarnes/Ops-Toolshed-Extension/actions/runs/30636540518).
2. **Medium: no build/package workflow exists.** The workflow only tests. No manifest validation, clean distributable ZIP, artifact upload, package-content audit or release output is defined. The releases API returned no releases. [.github/workflows/tests.yml:31](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/.github/workflows/tests.yml#L31); [package.json:6](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/package.json#L6).
3. **Medium: Node 20 is end-of-life.** Upgrade the CI runtime to a supported LTS, checking actions’ own runtime requirements independently. [.github/workflows/tests.yml:25](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/.github/workflows/tests.yml#L25); [Node release status](https://nodejs.org/en/about/previous-releases).
4. **Medium: timezone-dependent stats test.** The implementation converts local midnight to ISO; the test expects UTC midnight. In this environment it produced 14 January at 23:00Z instead of 15 January at 00:00Z. Decide the intended date semantics, then test UTC and Europe/London explicitly. Do not hide it with force-exit or call this a resize regression. [background/stats-manager.js:41](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/background/stats-manager.js#L41); [tests/stats-manager.test.js:78](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/tests/stats-manager.test.js#L78).
5. **Low: build metadata labels the parent commit.** The pre-commit update reads HEAD before the new commit exists; the bundled commit label therefore identifies its parent. If this is intentional, name it accordingly. Packaging should stamp the actual checked-out source SHA. [update-build-info.js:19](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/update-build-info.js#L19); [AGENTS.md:11](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/AGENTS.md#L11).

### Suggestions

- Cover maintained release branches using a deliberate pattern; add manual dispatch, concurrency cancellation, syntax/manifest validation and a clean ZIP artifact stage. Package from an explicit allowlist so source tests, docs, node_modules, development hooks and backup icons cannot leak into the distribution.
- Add an artifact smoke check: every manifest resource exists, no unapproved remote executable scripts, ZIP loads unpacked, popup opens, a representative feature appears, and settings persist. Preserve the route-contract gate for lifecycle work.
- Avoid release-note tests that require exactly five entries and fixed item positions; test ordering, required content and version consistency instead (`tests/release-metadata.test.js:54`). Pin Actions to reviewed commit SHAs and use Dependabot/Renovate for updates; record extension version and tested SHA in the artifact name. Add CI instructions to README. Do not change the repo’s default branch as part of an unrelated UI patch.

## 3. Toolbar popup, reminder popups, toasts and campaign history

### Toolbar popup

**Strengths:** local assets avoid the previous remote-font startup delay; launch links are visible; field-specific errors exist; the global feature switch exposes on/off state.

**Issues:**

- **Medium: keyboard access is incomplete.** Settings, roadmap and feedback are clickable divs with no button/link semantics or keyboard handlers. Campaign inputs use placeholders rather than persistent labels; errors are not associated via aria-describedby/live status. [popup.html:84](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.html#L84); [popup.html:50](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.html#L50); [popup.js:280](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.js#L280)
- **Medium: invalid months silently roll into another year.** Numeric date branches use `new Date(year, month - 1, 1)` without checking 1–12, so 13/2026 becomes January 2027 and opens that Actualise month. [popup.js:435](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.js#L435)
- **Low: two identically named Open Campaign buttons and no date-format example until failure.** The two-column inputs make route selection less clear at the fixed 320px content width plus 40px horizontal padding. Date parse failure uses an alert while ID failure uses inline text. [popup.html:47](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.html#L47); [style.css:5](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/style.css#L5); [popup.js:414](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.js#L414)
- **Low: campaign ID validation allows arbitrary characters after C.** It is URL-encoded, so this is a validation/usability issue rather than a demonstrated injection flaw. [popup.js:373](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.js#L373)

**Suggestions:** make all actions native buttons/links; label the two routes “Open by Campaign ID” and “Find D/O number”; add persistent input labels and examples; display one consistent inline validation style; show lookup progress and disable repeated submission until completion. Give NGM locations plain-language explanations supplied by the business owner.

### Reminder popups

- **Medium accessibility issue:** built-in/custom reminders add an overlay and content div, but no dialog labelling, initial focus, focus trap or focus restoration. A five-second default lockout disables Got it. Keyboard users can remain on the underlying page while it is visually blocked. [features/reminders.js:155](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/reminders.js#L155); [features/reminders.js:303](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/reminders.js#L303)
- Sanitisation is a positive: custom content is passed through an allowed-tag builder; built-in text is escaped. Preserve this when sharing a dialog component. [utils.js:16](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/utils.js#L16)
- Suggested shared reminder component: semantic title/description, focus lifecycle, reduced motion, consistent close control and countdown announcement. Keep a configurable countdown if it is a deliberate business rule, rather than silently removing it.

### Toasts

- **Medium: approver directory clipboard failures give no user-facing error.** Both copy promises only have a success handler. The favourites operation can still save even if copying fails. [approvers.js:288](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/approvers.js#L288)
- Shared utility, Order ID, Approvers, Settings and feedback each implement separate toast creation/timers/styles. The shared toast is a plain div without role=status/alert. This produces inconsistent timing and screen-reader feedback. [utils.js:177](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/utils.js#L177); [features/order-id-copy.js:102](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/order-id-copy.js#L102); [approvers.js:273](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/approvers.js#L273); [settings.js:713](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L713); [features/feedback-modal.js:75](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/feedback-modal.js#L75).
- Suggest one configurable toast service with explicit success/error semantics, polite announcements, cancellation of old timers, and an anchored variant where the action context matters.

### Campaign history

**Strengths:** labelled dialog/search, escaped text rendering, highlighted matches, explicit loading/empty/error states, compact pagination, expansion, reduced-motion handling and local retention capped at 2,000 entries.

**Issues:**

- **Medium, code-level race risk:** writes are serialised only within each tab’s content-script instance. Two tabs can read the same array, append different visits and overwrite each other. The onChanged handler only processes sync settings, so already-open panels also lack local-history live refresh. Centralise history mutations in the service worker and notify readers. [features/campaign-history.js:46](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/campaign-history.js#L46); [features/campaign-history.js:608](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/campaign-history.js#L608); [features/campaign-history.js:1856](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/campaign-history.js#L1856)
- **Medium accessibility issue:** expanded history sets aria-modal=true but does not trap focus or make the underlying page inert; closing does not restore focus to its opener. [features/campaign-history.js:1434](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/campaign-history.js#L1434); [features/campaign-history.js:1789](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/campaign-history.js#L1789)
- **Suggestion:** add clear/export and retention controls, explaining that stopping logging does not delete existing records. Expanded mode renders every match, up to 2,000 rows; keep it paginated or virtualise once real profile measurements justify it. [features/campaign-history.js:1573](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/campaign-history.js#L1573)

**Requested change implemented:** a bottom-left manual resize handle, arrow-key resizing, Home to reset, viewport bounds, and manual-size reset on close. Default 640px desktop sizing and existing Expand/Minimise remain. The compact four-row pagination is unchanged. The handle is hidden in expanded mode. Tested through jsdom; live visual verification remains outstanding.

### State inventory

| Surface | Loading/pending | Empty | Error/recovery |
|---|---|---|---|
| Toolbar links | Static; no destination loading state | Not applicable | Destination sign-in/errors are external |
| Campaign lookup | No explicit pending state | Required-ID error; blank date uses current month | Inline ID/D/O errors; date alert; lookup messaging errors |
| Meta tool launcher | Background request | No active tab can be reported | Wrong Meta page/injection error alert |
| Built-in/custom reminder | Disabled dismissal countdown on built-ins | No popup when no match | Storage problems mostly logged; no modal recovery UI |
| Generic toast | Timed visibility | Not applicable | Different error paths by feature; clipboard directory misses rejection handling |
| Campaign history | Loading status | No recorded campaigns; no search matches | Read failure status; reopening reloads; write failures logged |
| Settings | Storage read; ignored-warning checking status | Feature search has No feature settings found | Some writes/reset paths show errors, others do not |

## 4. Settings

### Good coverage

The Features tab has a search field with an empty state, feature preview descriptions, grouped sections, reset controls, and a tested click-to-persist contract for every visible checkbox. Reminder themes, countdown/frequency, custom rules, schedule, facts and stats all have controls. Campaign history viewing and logging are correctly separate. [settings.html:30](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.html#L30); [tests/settings-feature-toggle-contract.test.js:10](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/tests/settings-feature-toggle-contract.test.js#L10)

### Bugs/issues

- **Medium: many toggles lack accessible names.** Their visible text is a sibling span, while the wrapping label contains only the checkbox and decorative slider. JavaScript adds aria-describedby for previews, not an associated accessible name. Link labels using for/id or aria-labelledby. [settings.html:63](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.html#L63); [settings.js:394](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L394)
- **Medium: Auto Copy Campaign URL tooltip is factually wrong.** Settings says it copies when opening a campaign; implementation and README describe activating the campaign link control. [settings.js:337](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L337); [features/auto-copy-url.js:166](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/auto-copy-url.js#L166)
- **Low: callback-style default loading ignores runtime.lastError.** The custom callStorage resolver does not inspect Chrome’s callback error before reporting completion. Other storage adapters do. [settings.js:91](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L91)

### Suggestions

- Extend search across reminders, facts and maintenance actions; it currently searches Features. Add direct links from each feature’s guide to its settings section.
- Offer history clear/export and a real full-settings backup/restore. The current JSON export covers custom reminders only and has no matching import UI. Label that limitation clearly. [settings.html:441](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.html#L441)
- Put brief outcomes beside dense names such as DST Assurance and New Order UI, while keeping the previews. Make the hard-coded chat schedule configurable only if users need different support windows.
- Store feature IDs/defaults/descriptions in one registry used by Settings, the popup switch and tests, rather than maintaining several parallel lists.

## 5. Backend organisation

There is no hosted backend to reorganise. `background.js` is the Chrome service worker, `background/message-handlers.js` routes extension requests, and `background/stats-manager.js` queues local stats updates. Content features are separated under features/ and coordinated by route-aware `content.js`. The Social Booking Checker already separates its analysis engine from page logic and Meta client. This is a good fit for a local Operations tool.

**Issues and risks:**

- Campaign history mixes DOM extraction, storage, search, rendering, pagination and animation in 1,885 baseline lines. Move persistence into one background owner, leaving the feature module to collect and display. This directly addresses the cross-tab race.
- Weekly alarms use a fixed 10,080-minute interval, so a local-clock reminder can move one hour after DST. No onStartup alarm-existence check was found. Recalculate the next local date and repair missing alarms on startup. [background.js:65](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/background.js#L65)
- Local Meta tokens share the extension’s local storage area with other data. No setAccessLevel call was found. As a hardening suggestion, isolate credentials in trusted extension contexts and broker only the necessary requests, without disabling legitimate content-script history/stats access. This is not evidence of an observed leak.

**Suggestions:** retain local storage for settings/history and local CSV processing. Introduce a service backend only for a concrete shared-data requirement. Split larger modules by responsibility: Settings (2,190 lines), Social Finance UI (2,087), Campaign (1,389) and Approver Pasting (1,270). Keep route cleanup contracts and native-host selector knowledge close to the owning feature; avoid a broad rewrite that loses current fixes.

## 6. Documentation gap check

The [feature coverage matrix](documentation-coverage.md) contains **61 individual feature/control entries**, identifying existing README coverage, release-note/Settings copy, implementation and missing guidance. It describes the state before the new drafts. The three pre-existing technical notes cover campaign costing, the Meta Ads Manager custom view, and the Social Booking Checker API.

Most features are not wholly undocumented: labels/tooltips and release notes exist. The important gap is standalone usage and troubleshooting documentation. README omissions include Help Guides usage, bulk Actualise export, DST Assurance, Actualise month assurance, product-code warnings, direct Moe, Order Summary alignment, restoration after account switching, onboarding replay and the current legacy Billing Check workflow. Several have release-note coverage, so the matrix distinguishes “not in README” from “documented nowhere”.

Undocumented or insufficiently explained operating details include history retention/deletion limits, the global switch snapshot, O-number format, reminder export without import, timesheet timezone/DST, local stats definitions, guide placeholder destinations, loading-fact editorial workflow, clipboard failure recovery and email handoff. The incorrect auto-copy tooltip should be corrected as a separate fix.

**Separate follow-up deliverable:** [61 feature Markdown drafts](../features/README.md) and [61 corresponding wiki-ready pages](../wiki-drafts/Home.md), plus navigation. These are prepared drafts, not published wiki pages. Existing wiki contents could not be checked. No blank placeholder guide is represented as functioning content.

## 7. Specific refactors and redundant code

| Instance | Evidence | Suggested action |
|---|---|---|
| Feature toggle/default lists | [popup.js:1](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.js#L1); [settings.js:16](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L16); test contract mapping | One registry, with tests checking real persistence rather than copying a list blindly. |
| Multiple toast implementations | References in section 3 | One service with anchored and global modes, explicit error semantics and shared timers. |
| Repeated callback/Promise Chrome adapters | [features/campaign-history.js:76](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/campaign-history.js#L76); [settings.js:91](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L91); [social-finance.js:65](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/social-finance.js#L65) | Shared adapter with lastError handling and clearly separated context permissions. |
| Duplicate deep-DOM traversal | [utils.js:71](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/utils.js#L71); [features/campaign-history.js:175](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/campaign-history.js#L175); [features/auto-copy-url.js:52](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/auto-copy-url.js#L52) | Share traversal mechanics where semantics match. Preserve the auto-copy module’s deliberately scoped roots; do not replace them with a broad scan. |
| Identical cue selector lists | [features/auto-copy-url.js:18](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/auto-copy-url.js#L18); [features/auto-copy-url.js:27](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/features/auto-copy-url.js#L27) | Alias the identical list until the two meanings genuinely diverge. |
| Unreachable popup reminder listener blocks | [popup.js:172](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.js#L172); [popup.js:205](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.js#L205); no matching IDs in popup.html | Remove old optional control wiring if no alternate popup template is supported. Settings already owns reminder tests. |
| Obsolete removal comments | [popup.js:468](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/popup.js#L468) | Delete commentary about removed functions; retain comments explaining current constraints. |
| Backup icon tracked but not referenced | `icon-backup.png`; manifest references icon.png | Remove from distribution; retain in design assets only if needed. |
| Two guided-tour implementations | [settings.js:623](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L623); [settings.js:624](https://github.com/harrydbarnes/Ops-Toolshed-Extension/blob/b5a723e6d8f6acfeeb80e9a590eb57f12229b92d/settings.js#L624) | Both are currently reachable, so neither is proven dead. Choose one product flow, migrate, then delete the retired code and tests. |
| Bundled confetti and PDF.js | features/confetti.js; vendor/pdfjs | Used, not redundant. Track upgrades/licences instead of removing blindly. |

## Recommended order

1. Restore CI coverage of r1.9 and define the distributable package.
2. Replace dummy Help Guide targets or clearly mark unavailable guides.
3. Fix invalid month parsing, accessible action/setting names and missing clipboard error feedback.
4. Centralise history writes and give users explicit history-data controls.
5. Standardise modal/toast focus behaviour and remaining settings copy.
6. Refresh development dependencies and vendored assets in separate tested changes.
7. Review and publish the separately drafted feature documentation.
