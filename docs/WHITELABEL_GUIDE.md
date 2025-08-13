# Whitelabel Customization Guide

This guide explains how to customize the React Native template for your specific brand and requirements.

## Quick Start Customization

### 1. Basic Branding Configuration

Edit `config/branding.ts` to customize your app:

```typescript
export const yourBrandConfig: BrandingConfig = {
  app: {
    name: "Your App Name",
    version: "1.0.0", 
    buildNumber: "1"
  },
  webapp: {
    url: "https://your-webapp-url.com",
    title: "Your Web Platform"
  },
  colors: {
    primary: '#YOUR_PRIMARY_COLOR',
    secondary: '#YOUR_SECONDARY_COLOR', 
    background: '#FFFFFF',
    text: '#000000',
    accent: '#YOUR_ACCENT_COLOR'
  },
  assets: {
    logo: 'assets/your-logo.png',
    icon: 'assets/your-icon.png', 
    splashScreen: 'assets/your-splash.png'
  },
  fonts: {
    primary: 'YourPrimaryFont',
    secondary: 'YourSecondaryFont'
  }
};
```

### 2. Update App Configuration

Edit `app.json` for platform-specific settings:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/your-icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/your-splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#YOUR_BACKGROUND_COLOR"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.yourapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/your-adaptive-icon.png",
        "backgroundColor": "#YOUR_BACKGROUND_COLOR"
      },
      "package": "com.yourcompany.yourapp"
    },
    "web": {
      "favicon": "./assets/your-favicon.png"
    }
  }
}
```

## Asset Customization

### Required Assets

Replace these files in the `assets/` directory:

#### App Icon
- **File**: `assets/icon.png`
- **Size**: 1024x1024px
- **Format**: PNG with transparent background
- **Usage**: App store listings, device home screen

#### Adaptive Icon (Android)
- **File**: `assets/adaptive-icon.png`
- **Size**: 1024x1024px
- **Safe Zone**: Keep important content within center 672x672px
- **Usage**: Android home screens with various shapes

#### Splash Screen
- **File**: `assets/splash.png`
- **Size**: 1284x2778px (iPhone 13 Pro Max)
- **Format**: PNG
- **Usage**: Loading screen when app launches

#### Favicon (Web)
- **File**: `assets/favicon.png`
- **Size**: 32x32px or 16x16px
- **Format**: PNG or ICO
- **Usage**: Browser tab icon

### Asset Guidelines

#### Design Requirements
- **High Resolution**: Always provide @3x density assets
- **Consistent Branding**: Match your webapp's visual identity
- **Platform Guidelines**: Follow Apple and Google design standards
- **Testing**: Test on various screen sizes and orientations

#### File Naming Convention
```
assets/
├── icon.png              # Main app icon
├── adaptive-icon.png     # Android adaptive icon
├── splash.png            # Splash screen
├── favicon.png           # Web favicon
└── branding/
    ├── logo-light.png    # Logo for light theme
    ├── logo-dark.png     # Logo for dark theme
    └── watermark.png     # Optional watermark
```

## Advanced Customization

### Custom Fonts

1. **Add Font Files**:
   ```
   assets/fonts/
   ├── YourFont-Regular.ttf
   ├── YourFont-Bold.ttf
   └── YourFont-Light.ttf
   ```

2. **Update app.json**:
   ```json
   {
     "expo": {
       "fonts": [
         "./assets/fonts/YourFont-Regular.ttf",
         "./assets/fonts/YourFont-Bold.ttf"
       ]
     }
   }
   ```

3. **Use in Branding Config**:
   ```typescript
   fonts: {
     primary: 'YourFont-Regular',
     secondary: 'YourFont-Bold'
   }
   ```

### Navigation Customization

#### Tab Names and Icons
Edit `app/(tabs)/_layout.tsx`:

```typescript
<Tabs.Screen
  name="webapp"
  options={{
    title: 'Your Platform', // Custom tab name
    tabBarIcon: ({ color }) => <IconSymbol size={28} name="your-icon" color={color} />,
  }}
/>
```

#### Hide Tabs for Full Screen WebView
```typescript
// In webapp.tsx - for full screen experience
export default function WebAppScreen() {
  return (
    <Stack.Screen options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
    <ThemeProvider>
      <WebAppView />
    </ThemeProvider>
  );
}
```

### WebView Customization

#### Custom Headers (Authentication)
```typescript
<WebView
  source={{ 
    uri: branding.webapp.url,
    headers: {
      'Authorization': 'Bearer your-token',
      'X-Client-ID': 'your-client-id',
      'X-Brand-Config': JSON.stringify(branding)
    }
  }}
/>
```

#### JavaScript Injection
```typescript
const injectedJavaScript = `
  // Inject brand colors into webapp
  document.documentElement.style.setProperty('--primary-color', '${branding.colors.primary}');
  
  // Hide webapp navigation if using native tabs
  const webNavigation = document.querySelector('.webapp-nav');
  if (webNavigation) webNavigation.style.display = 'none';
  
  true; // Required for iOS
`;

<WebView
  injectedJavaScript={injectedJavaScript}
  onMessage={handleWebMessage}
/>
```

#### Communication Bridge
```typescript
// Handle messages from webapp
const handleWebMessage = (event: WebViewMessageEvent) => {
  const data = JSON.parse(event.nativeEvent.data);
  
  switch (data.type) {
    case 'NAVIGATE_HOME':
      router.push('/');
      break;
    case 'SHOW_MENU':
      setMenuVisible(true);
      break;
    case 'UPDATE_BADGE':
      // Update tab badge count
      break;
  }
};
```

## Platform-Specific Customization

### iOS Specific

#### Info.plist Customization
Add to `app.json`:
```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "CFBundleDisplayName": "Your App Name",
        "NSCameraUsageDescription": "This app uses camera for...",
        "NSLocationWhenInUseUsageDescription": "This app uses location for..."
      }
    }
  }
}
```

### Android Specific

#### Permissions
```json
{
  "expo": {
    "android": {
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.ACCESS_FINE_LOCATION"
      ]
    }
  }
}
```

## Testing Your Customizations

### 1. Development Testing
```bash
npm run start
# Test on device via Expo Go
```

### 2. Build Testing
```bash
# Test Android build
npx expo build:android

# Test iOS build  
npx expo build:ios
```

### 3. Asset Validation
- Test on various screen sizes
- Verify icon appears correctly in app stores
- Check splash screen on slow connections
- Validate font loading

## Common Customization Scenarios

### Scenario 1: Corporate Whitelabel
- Company logo and colors
- Corporate fonts
- Employee directory webapp
- Enterprise security headers

### Scenario 2: Client Portal
- Client-specific branding
- Custom domain webapp
- Client authentication tokens
- Branded push notifications

### Scenario 3: Multi-tenant SaaS
- Tenant-specific URLs
- Dynamic color schemes
- Custom feature flags
- Tenant-specific analytics

## Troubleshooting

### Assets Not Loading
- Verify file paths match config
- Check file sizes (keep under 1MB for icons)
- Ensure proper file formats

### Fonts Not Displaying
- Confirm font files are properly linked
- Check font names match exactly
- Test font loading in development

### WebView Issues
- Test webapp URL in mobile browser first
- Check CORS settings on webapp
- Verify SSL certificates

## Next Steps

After customizing your brand:
1. Follow [DEPLOYMENT_ANDROID.md](./DEPLOYMENT_ANDROID.md) for Android store
2. Follow [DEPLOYMENT_IOS.md](./DEPLOYMENT_IOS.md) for iOS App Store
3. Set up analytics and crash reporting
4. Configure push notifications
