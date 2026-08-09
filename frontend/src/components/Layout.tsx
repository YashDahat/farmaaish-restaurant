import SiteLayout from '@/shell/SiteLayout';
import { siteConfig } from '@/config/siteConfig';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <SiteLayout config={siteConfig}>{children}</SiteLayout>;
}