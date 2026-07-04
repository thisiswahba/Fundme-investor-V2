# FundMe — Investor App

Investor-facing dashboard: onboarding, opportunities, portfolio, wallet, and profile. Originally generated via Figma Make, extended by hand since.

This is the paired app to the borrower app — [`fundme`](https://github.com/wahbas/fundme) (sibling folder `../fundme` on this machine). Run the two side by side; they're separate repos, not a monorepo.

## Version note

**`main`** is the version whose screens were last synced to Figma: Onboarding, Login, Dashboard, Overview, Opportunities, Opportunity Detail, Portfolio, Investment Detail, Wallet, Profile. It already includes the `ship/profile-deposit-registration` branch (profile redesign, deposit/withdraw flows, registration polish) — that branch is merged, no need to check it out separately.

Figma file: https://www.figma.com/design/kgUGMwaYYnu3AxMLRdkU8s/Incorporate-logos-and-inspiration

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
