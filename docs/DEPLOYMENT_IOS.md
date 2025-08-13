# iOS Deployment Guide

This guide covers everything needed to deploy your whitelabel React Native app to the Apple App Store.

## Prerequisites

Before starting deployment, ensure you have:
- ✅ Completed [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
- ✅ Customized your app using [WHITELABEL_GUIDE.md](./WHITELABEL_GUIDE.md)
- ✅ **macOS computer** (required for iOS development)
- ✅ **Xcode** installed from Mac App Store
- ✅ **Apple Developer Account** ($99/year)

## 1. Apple Developer Account Setup

### Enroll in Apple Developer Program

1. Visit [developer.apple.com](https://developer.apple.com)
2. Click "Account" → "Enroll"
3. Choose Individual or Organization account
4. Pay $99 annual fee
5. Wait for approval (can take 24-48 hours)

### Developer Account Configuration

1. **Team ID**: Note your Team ID from Account → Membership
2. **Certificates**: Download development and distribution certificates
3. **App IDs**: Create unique App ID for your app
4. **Provisioning Profiles**: Create profiles for development and distribution

## 2. Prepare Your App for Production

### Update App Configuration

Edit `app.json` with iOS-specific settings:

```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourapp",
      "buildNumber": "1",
      "supportsTablet": true,
      "requireFullScreen": false,
      "userInterfaceStyle": "automatic",
      "infoPlist": {
        "CFBundleDisplayName": "Your App Name",
        "NSAppTransportSecurity": {
          "NSAllowsArbitraryLoads": true
        },
        "NSCameraUsageDescription": "This app uses camera for profile photos",
        "NSLocationWhenInUseUsageDescription": "This app uses location for nearby features"
      }
    }
  }
}
```

### Privacy Permissions

Add required permission descriptions to `infoPlist`:

```json
{
  "ios": {
    "infoPlist": {
      "NSCameraUsageDescription": "Access camera to take photos",
      "NSPhotoLibraryUsageDescription": "Access photo library to select images", 
      "NSMicrophoneUsageDescription": "Access microphone for voice messages",
      "NSLocationWhenInUseUsageDescription": "Access location for location-based features",
      "NSContactsUsageDescription": "Access contacts to invite friends",
      "NSCalendarsUsageDescription": "Access calendar to schedule events"
    }
  }
}
```

## 3. Build Configuration

### Xcode Project Setup

```bash
# Generate native iOS project
npx expo prebuild --platform ios

# Open in Xcode
open ios/YourApp.xcworkspace
```

### Configure Signing & Capabilities

In Xcode:
1. Select your project in navigator
2. Select your app target
3. Go to "Signing & Capabilities" tab
4. **Automatically manage signing**: Enable
5. Select your development team
6. Verify bundle identifier matches your App ID

### Build Settings

Configure for production:
1. **Build Configuration**: Release
2. **Code Signing Identity**: iOS Distribution
3. **Provisioning Profile**: App Store profile
4. **Deployment Target**: iOS 13.0+ (recommended)

## 4. Build Production App

### Using Expo Build Service (Recommended)

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build for iOS
eas build --platform ios --profile production
```

### Local Build with Xcode

```bash
# Open project in Xcode
open ios/YourApp.xcworkspace

# In Xcode:
# 1. Select "Any iOS Device" as destination
# 2. Product → Archive
# 3. Wait for build to complete
# 4. Organizer window will open with your archive
```

## 5. Test Your Build

### TestFlight Testing (Recommended)

TestFlight allows you to test with up to 10,000 external testers:

1. **Upload to App Store Connect**:
   - In Xcode Organizer, click "Distribute App"
   - Choose "App Store Connect"
   - Upload for testing and validation

2. **Configure TestFlight**:
   - Go to App Store Connect
   - Select your app → TestFlight
   - Add test information
   - Submit for Beta App Review

3. **Invite Testers**:
   - Add testers by email
   - They'll receive TestFlight app invitation
   - Can provide feedback through TestFlight

### Device Testing

For quick testing on your own devices:

```bash
# Install on connected device
# In Xcode: Window → Devices and Simulators
# Drag .ipa file to your device
```

### Testing Checklist

- [ ] App launches without crashes
- [ ] WebView loads correctly
- [ ] Navigation works properly
- [ ] App icon displays correctly
- [ ] Splash screen appears
- [ ] Performance is smooth (60fps)
- [ ] Memory usage is reasonable
- [ ] Network requests work
- [ ] Push notifications (if implemented)
- [ ] In-app purchases (if implemented)

## 6. App Store Connect Setup

### Create App Record

1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
2. Click "My Apps" → "+" → "New App"
3. Fill in app information:
   - **Platform**: iOS
   - **Name**: Your app name
   - **Primary Language**: Your primary language
   - **Bundle ID**: Select your bundle identifier
   - **SKU**: Unique identifier (can be bundle ID)

### App Information

Complete required sections:

#### General Information
- **App Name**: Must be unique on App Store
- **Subtitle**: Brief description (iOS 11+)
- **Category**: Choose primary and secondary categories
- **Content Rights**: Who owns content in your app

#### Privacy Policy
- **Privacy Policy URL**: Required for all apps
- **Privacy Practices**: Describe data collection

#### App Review Information
- **Contact Information**: For App Review team
- **Demo Account**: If app requires login
- **Notes**: Additional information for reviewers

### Version Information

#### Screenshots (Required)
Upload high-quality screenshots:

- **6.7" Display (iPhone 14 Pro Max)**: 1290 x 2796 pixels
- **6.5" Display (iPhone XS Max)**: 1242 x 2688 pixels  
- **5.5" Display (iPhone 8 Plus)**: 1242 x 2208 pixels
- **iPad Pro (6th Gen)**: 2048 x 2732 pixels (optional)

#### App Preview Videos (Optional)
- **Duration**: 15-30 seconds
- **Format**: M4V, MP4, or MOV
- **Resolution**: Match screenshot requirements

#### Description
```
App Description (max 4000 characters):

Experience the full power of [Your Platform] with our native mobile app. 
Seamlessly access all your tools and data in an interface optimized for mobile devices.

KEY FEATURES:
• Full platform functionality in native app
• Optimized touch interface for mobile
• Secure authentication and data protection
• Push notifications for important updates
• Offline access to critical features
• Biometric authentication support

PERFECT FOR:
• Business professionals on the go
• Teams needing mobile access to [Platform]
• Users who require secure mobile workflows

SECURITY & PRIVACY:
• End-to-end encryption
• Biometric authentication
• No data stored locally
• Compliance with industry standards

Download now and take [Your Platform] wherever you go!
```

#### Keywords
```
Keywords (max 100 characters, comma-separated):
business,productivity,platform,mobile,secure,enterprise,workflow,tools
```

#### Promotional Text (Optional)
```
Promotional Text (max 170 characters):
New: Enhanced mobile interface with improved performance and offline capabilities!
```

## 7. Submit for Review

### Pre-Submission Checklist

- [ ] App has been tested thoroughly
- [ ] All required metadata is complete
- [ ] Screenshots accurately represent the app
- [ ] Privacy policy is accessible
- [ ] App follows App Store Review Guidelines
- [ ] Content is appropriate for selected age rating

### Submit Process

1. **Upload Build**:
   - In App Store Connect, go to your app
   - Select version → Build
   - Choose your uploaded build

2. **Complete Metadata**:
   - Verify all required fields are complete
   - Add release notes for this version

3. **Submit for Review**:
   - Click "Submit for Review"
   - Answer additional questions about app functionality
   - Confirm submission

### Review Timeline

- **Standard Review**: 1-3 days (as of 2024)
- **Expedited Review**: 1 day (limited uses, for critical issues)
- **Status Updates**: Check App Store Connect for updates

## 8. Post-Approval Process

### Release Management

Choose release method:
- **Automatic Release**: App goes live immediately after approval
- **Manual Release**: You control when app goes live
- **Scheduled Release**: Set specific date/time for release

### Version Updates

For app updates:
1. Increment build number in `app.json`
2. Update version for user-visible changes
3. Build and upload new version
4. Update release notes
5. Submit for review

```json
{
  "expo": {
    "version": "1.0.1",      // User-visible version
    "ios": {
      "buildNumber": "2"     // Internal build number (must increase)
    }
  }
}
```

## 9. Troubleshooting

### Common Build Issues

#### Code Signing Errors
```bash
# Clear derived data
rm -rf ~/Library/Developer/Xcode/DerivedData

# Refresh provisioning profiles
# Xcode → Preferences → Accounts → Download Manual Profiles
```

#### Archive Issues
- Ensure "Generic iOS Device" is selected
- Check Build Settings for Release configuration
- Verify all dependencies are properly linked

#### WebView Issues on iOS
Add to `app.json`:
```json
{
  "ios": {
    "infoPlist": {
      "NSAppTransportSecurity": {
        "NSAllowsArbitraryLoads": true,
        "NSExceptionDomains": {
          "your-webapp-domain.com": {
            "NSExceptionAllowsInsecureHTTPLoads": true,
            "NSExceptionMinimumTLSVersion": "1.0"
          }
        }
      }
    }
  }
}
```

### Common App Store Rejections

#### Guideline 4.2 - Minimum Functionality
- Ensure app provides substantial functionality beyond just a web wrapper
- Add native features like push notifications, biometric auth, etc.

#### Guideline 2.1 - App Completeness
- Test app thoroughly before submission
- Ensure all features work as described
- Remove any debug functionality

#### Guideline 5.1.1 - Privacy Policy
- Include accessible privacy policy
- Accurately describe data collection practices

#### Guideline 4.0 - Design
- Follow iOS Human Interface Guidelines
- Ensure app works on all supported devices
- Use native iOS navigation patterns

## 10. Advanced Configuration

### Custom URL Schemes

Add URL scheme support:
```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "CFBundleURLTypes": [
          {
            "CFBundleURLName": "com.yourcompany.yourapp",
            "CFBundleURLSchemes": ["yourapp"]
          }
        ]
      }
    }
  }
}
```

### Push Notifications

Enable push notifications:
```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "UIBackgroundModes": ["remote-notification"]
      }
    }
  }
}
```

### App Transport Security

For specific domains:
```json
{
  "ios": {
    "infoPlist": {
      "NSAppTransportSecurity": {
        "NSExceptionDomains": {
          "your-api-domain.com": {
            "NSExceptionRequiresForwardSecrecy": false,
            "NSExceptionMinimumTLSVersion": "1.0",
            "NSExceptionAllowsInsecureHTTPLoads": true,
            "NSIncludesSubdomains": true
          }
        }
      }
    }
  }
}
```

## 11. App Store Optimization (ASO)

### Keyword Optimization
- Research relevant keywords using App Store Connect
- Use tools like Sensor Tower or Mobile Action
- Include keywords naturally in description
- Monitor and adjust based on performance

### Visual Assets
- A/B test different icon designs
- Use compelling screenshots that show key features
- Create engaging app preview videos
- Localize assets for different markets

### Conversion Optimization
- Monitor conversion rates in App Store Connect
- Optimize app title and subtitle
- Improve app description based on user feedback
- Update screenshots to highlight new features

## Resources

- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/)
- [App Store Connect Help](https://developer.apple.com/help/app-store-connect/)
- [TestFlight Documentation](https://developer.apple.com/testflight/)

## Next Steps

After successful iOS deployment:
1. Monitor app performance and user reviews
2. Implement analytics and crash reporting
3. Plan feature updates and improvements
4. Consider international market expansion
5. Set up automated CI/CD for future releases
