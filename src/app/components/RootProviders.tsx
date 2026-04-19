import { Outlet } from 'react-router';
import { Toaster } from 'sonner';
import { I18nProvider, useI18n } from '../i18n';
import { DemoPersonaProvider } from '../demoPersona';

function DirectionalToaster() {
  const { dir } = useI18n();
  return (
    <Toaster
      position={dir === 'rtl' ? 'top-left' : 'top-right'}
      dir={dir}
      richColors
      closeButton
      toastOptions={{
        style: {
          fontFamily: 'inherit',
          borderRadius: '12px',
        },
      }}
    />
  );
}

export function RootProviders() {
  return (
    <I18nProvider>
      <DemoPersonaProvider>
        <Outlet />
        <DirectionalToaster />
      </DemoPersonaProvider>
    </I18nProvider>
  );
}
