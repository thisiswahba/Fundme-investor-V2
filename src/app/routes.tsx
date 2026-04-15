import { createBrowserRouter } from "react-router";
import { RootProviders } from "./components/RootProviders";
import { Layout } from "./components/Layout";
import { OverviewPage } from "./pages/OverviewPage";
import { DashboardPage } from "./pages/DashboardPage";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { WalletPage } from "./pages/WalletPage";
import { OpportunityDetailPage } from "./pages/OpportunityDetailPage";
import { OnboardingPage } from "./pages/onboarding";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { InvestmentDetailPage } from "./pages/InvestmentDetailPage";

export const router = createBrowserRouter([
  {
    Component: RootProviders,
    children: [
      {
        path: "/",
        Component: OnboardingPage,
      },
      {
        path: "/onboarding",
        Component: OnboardingPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/app",
        Component: Layout,
        children: [
          { index: true, Component: DashboardPage },
          { path: "overview", Component: OverviewPage },
          { path: "opportunities", Component: OpportunitiesPage },
          { path: "opportunities/:id", Component: OpportunityDetailPage },
          { path: "portfolio", Component: PortfolioPage },
          { path: "portfolio/:investmentId", Component: InvestmentDetailPage },
          { path: "wallet", Component: WalletPage },
          { path: "profile", Component: ProfilePage },
        ],
      },
    ],
  },
]);
