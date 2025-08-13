import React from 'react';
import { ThemeProvider as PaperProvider } from 'react-native-paper';
import { BrandingConfig, defaultBrandingConfig } from '../config/branding';

interface ThemeContextType {
  branding: BrandingConfig;
  updateBranding: (config: Partial<BrandingConfig>) => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  branding: defaultBrandingConfig,
  updateBranding: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branding, setBranding] = React.useState<BrandingConfig>(defaultBrandingConfig);

  const updateBranding = (config: Partial<BrandingConfig>) => {
    setBranding(prev => ({ ...prev, ...config }));
  };

  const theme = {
    colors: {
      primary: branding.colors.primary,
      accent: branding.colors.accent,
      background: branding.colors.background,
      text: branding.colors.text,
      secondary: branding.colors.secondary,
    },
    fonts: {
      regular: branding.fonts.primary,
      medium: branding.fonts.secondary,
    },
  };

  return (
    <ThemeContext.Provider value={{ branding, updateBranding }}>
      <PaperProvider theme={theme}>
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
};
