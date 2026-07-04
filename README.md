# FundMe — Investor App

Investor-facing dashboard: onboarding, opportunities, portfolio, wallet, and profile. Originally generated via Figma Make, extended by hand since.

This is the paired app to the borrower app — [`fundme`](https://github.com/wahbas/fundme) (sibling folder `../fundme` on this machine). Run the two side by side; they're separate repos, not a monorepo.

## Version note

**`main`** is the version kept in sync with Figma: Onboarding, Login, Dashboard, Overview, Opportunities, Opportunity Detail, Portfolio, Investment Detail, Wallet, Profile, plus the Dashboard States (First-Time User, VIP) and Popups (Add Funds, Withdraw, Auto Invest, Invest Now) sections. It already includes the `ship/profile-deposit-registration` branch (profile redesign, deposit/withdraw flows, registration polish) — that branch is merged, no need to check it out separately.

- **Figma — design reference, kept in sync:** https://www.figma.com/design/z7uTF4NKuvEqwmiWBPH5zD/FundMe-Investor-V2-%E2%80%94-All-Screens
- **Figma Make — original code-gen source:** https://www.figma.com/design/kgUGMwaYYnu3AxMLRdkU8s/Incorporate-logos-and-inspiration

## Run it

```bash
npm install
npm run dev      # http://localhost:5173 (or next free port)
npm run build    # vite build
```

## Routes

| Path | Screen |
|---|---|
| `/`, `/onboarding` | Onboarding |
| `/login` | Login |
| `/app` | Dashboard |
| `/app/overview` | Overview |
| `/app/opportunities` | Opportunities |
| `/app/opportunities/:id` | Opportunity detail |
| `/app/portfolio` | Portfolio |
| `/app/portfolio/:investmentId` | Investment detail |
| `/app/wallet` | Wallet |
| `/app/profile` | Profile |

## Demo states

A "Demo Personas" switcher (flask icon, bottom-right of the dashboard) toggles a `?persona=` query param that drives the empty/VIP variants without a backend:

- `/app` — regular investor (default)
- `/app?persona=new` — first-time user (empty state)
- `/app?persona=vip` — VIP (dark theme, larger portfolio)

The VIP theme propagates to Wallet, Portfolio, Opportunities, and Profile too while `?persona=vip` is set.

## Language (EN/AR)

The app defaults to Arabic. Every page under `/app/*` has a language toggle in the top nav (globe icon, labeled `EN`); the Login page has its own toggle in the top corner (labeled `English`). Both call the same `setLang()` — no page reload, no URL param.

Onboarding is Arabic-only: its steps are hardcoded strings with no `t()`/i18n hook at all, so there is no English mode to switch to there (would require a code change, not a toggle).

Some mock content (company names, a few modal labels like "Invest Now") stays Arabic even in English mode — that's genuinely hardcoded in the current app, not a bug in these instructions.

## Reproducing the Figma screens exactly

To land on the same states captured in the Figma file:

| Figma frame | Steps |
|---|---|
| Dashboard / Overview / Opportunities / Opportunity Detail / Portfolio / Investment Detail / Wallet / Profile | Visit the route from **Routes** above. Toggle language if you need the `(EN)` variant. |
| Dashboard — First-Time User | `/app?persona=new` |
| Dashboard — VIP | `/app?persona=vip` |
| Popup — Add Funds | Go to `/app/wallet`, click **Add Funds** (`إضافة أموال` in Arabic) |
| Popup — Withdraw | Go to `/app/wallet`, click **Withdraw** (`سحب` in Arabic — it's the button in the dark balance card, not the "سحب" transaction filter chip lower on the page) |
| Popup — Auto Invest | Go to `/app/portfolio`, click **Activate Auto Invest** (`تفعيل الاستثمار التلقائي`) inside the Auto Invest card |
| Popup — Invest Now | Go to `/app/opportunities/1`, click the bottom sticky button `استثمر الآن` (Arabic-only, no English label) |

All popup/state screenshots in Figma were captured at 1440×900 viewport, 2x device scale.
