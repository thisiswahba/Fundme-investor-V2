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
