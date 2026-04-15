import { usePersona } from '../demoPersona';
import { EmptyOverviewPage } from './EmptyOverviewPage';
import { OverviewPage } from './OverviewPage';
import { VIPOverviewPage } from './VIPOverviewPage';

export function DashboardPage() {
  const { persona } = usePersona();

  if (persona.dashboardView === 'vip') {
    return <VIPOverviewPage />;
  }

  if (persona.dashboardView === 'empty') {
    return <EmptyOverviewPage />;
  }

  return <OverviewPage />;
}
