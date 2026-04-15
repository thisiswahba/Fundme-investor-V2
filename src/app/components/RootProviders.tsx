import { Outlet } from 'react-router';
import { I18nProvider } from '../i18n';
import { DemoPersonaProvider } from '../demoPersona';

export function RootProviders() {
  return (
    <I18nProvider>
      <DemoPersonaProvider>
        <Outlet />
      </DemoPersonaProvider>
    </I18nProvider>
  );
}
