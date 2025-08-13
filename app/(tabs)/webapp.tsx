import React from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { WebAppView } from '@/components/WebAppView';

export default function WebAppScreen() {
  return (
    <ThemeProvider>
      <WebAppView />
    </ThemeProvider>
  );
}
