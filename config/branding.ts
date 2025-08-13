export interface BrandingConfig {
  app: {
    name: string;
    version: string;
    buildNumber: string;
  };
  webapp: {
    url: string;
    title: string;
  };
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  assets: {
    logo: string;
    icon: string;
    splashScreen: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
}

export const defaultBrandingConfig: BrandingConfig = {
  app: {
    name: "Ultrade",
    version: "1.0.0",
    buildNumber: "1"
  },
  webapp: {
    url: "https://app.ultrade.org",
    title: "Ultrade Platform"
  },
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    text: '#000000',
    accent: '#FF2D55'
  },
  assets: {
    logo: 'assets/logo.png',
    icon: 'assets/icon.png',
    splashScreen: 'assets/splash.png'
  },
  fonts: {
    primary: 'System',
    secondary: 'System'
  }
};
