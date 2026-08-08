import { ReactNode } from 'react';
import { SiteConfig } from '@/shell/types';
import SiteHeader from '@/shell/SiteHeader';
import SiteFooter from '@/shell/SiteFooter';

interface LayoutProps {
  config: SiteConfig;
  children: ReactNode;
}

export default function Layout({ config, children }: LayoutProps): ReactNode {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader {...config.header} />
      <main className="flex-grow">
        {children}
      </main>
      <SiteFooter {...config.footer} />
    </div>
  );
}