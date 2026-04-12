import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { OverviewPage } from "./pages/OverviewPage";
import { EmptyOverviewPage } from "./pages/EmptyOverviewPage";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { WalletPage } from "./pages/WalletPage";
import { OpportunityDetailPage } from "./pages/OpportunityDetailPage";
import { OnboardingPage } from "./pages/onboarding";

export const router = createBrowserRouter([
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: EmptyOverviewPage },
      { path: "overview", Component: OverviewPage },
      { path: "opportunities", Component: OpportunitiesPage },
      { path: "opportunities/:id", Component: OpportunityDetailPage },
      { path: "portfolio", Component: PortfolioPage },
      { path: "wallet", Component: WalletPage },
    ],
  },
]);