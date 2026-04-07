import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { OverviewPage } from "./pages/OverviewPage";
import { EmptyOverviewPage } from "./pages/EmptyOverviewPage";
import { OpportunitiesPage } from "./pages/OpportunitiesPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { WalletPage } from "./pages/WalletPage";
import { OpportunityDetailPage } from "./pages/OpportunityDetailPage";

export const router = createBrowserRouter([
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